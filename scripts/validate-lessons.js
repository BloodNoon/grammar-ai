/**
 * Scripts/validate-lessons.js
 * CLI script to validate StudentsWriting lesson JSON files against the lesson schema.
 */

const fs = require('fs');
const path = require('path');

// Dynamically add client/node_modules to resolve ajv and ajv-keywords if run from workspace root
const clientNodeModules = path.join(__dirname, '..', 'client', 'node_modules');
if (fs.existsSync(clientNodeModules)) {
  module.paths.push(clientNodeModules);
}

let Ajv;
try {
  Ajv = require('ajv');
} catch (err) {
  console.error('\x1b[31mError: Could not resolve "ajv" package. Please run "npm install" inside the client directory.\x1b[0m');
  process.exit(1);
}

// Initialize AJV
const ajv = new Ajv({ allErrors: true, useDefaults: true });

// Attempt to load ajv-keywords if available
try {
  const addKeywords = require('ajv-keywords');
  addKeywords(ajv);
} catch (err) {
  // Optional dependency, don't crash if it fails
}

// Paths
const schemaPath = path.join(__dirname, '..', 'client', 'src', 'data', 'lessons', 'lesson.schema.json');
const lessonsDir = path.join(__dirname, '..', 'client', 'src', 'data', 'lessons');
const testFixturesDir = path.join(__dirname, 'test-fixtures');

// Normalization function for BuildGame comparison
function normalizeWord(word) {
  return word.toLowerCase().replace(/[.,!?;:'"]/g, '').trim();
}

/**
 * Validates a single lesson JSON file.
 * @param {string} filePath Absolute path to the JSON file.
 * @param {object} schema Compiled AJV validation schema.
 * @returns {object} { success: boolean, errors: string[] }
 */
function validateLessonFile(filePath, validate) {
  const fileName = path.basename(filePath);
  const errors = [];

  let fileContent;
  try {
    fileContent = fs.readFileSync(filePath, 'utf8');
  } catch (err) {
    return { success: false, errors: [`Failed to read file: ${err.message}`] };
  }

  // Parse JSON
  let steps;
  try {
    steps = JSON.parse(fileContent);
  } catch (err) {
    return { success: false, errors: [`JSON Parse Error: ${err.message}`] };
  }

  if (!Array.isArray(steps)) {
    return { success: false, errors: ['Root element must be an Array of steps'] };
  }

  // 1. Schema Validation
  const valid = validate(steps);
  if (!valid) {
    validate.errors.forEach(err => {
      // Find step index from dataPath (e.g., "/0/title" or "[0].title")
      const match = err.instancePath.match(/^\/(\d+)/);
      const stepIdx = match ? match[1] : 'unknown';
      errors.push(`Step [${stepIdx}] at path "${err.instancePath}": ${err.message} (${JSON.stringify(err.params)})`);
    });
  }

  // 2. Custom Business Logic Validations
  const seenIds = new Set();
  
  steps.forEach((step, idx) => {
    if (!step || typeof step !== 'object') return;

    // Check duplicate ID
    if (step.id !== undefined) {
      if (seenIds.has(step.id)) {
        errors.push(`Step [${idx}]: Duplicate ID "${step.id}" detected in the same file`);
      } else {
        seenIds.add(step.id);
      }
    }

    // Sort step category alignment
    if (step.step_type === 'sort') {
      const categories = step.categories || [];
      const items = step.items || [];
      const categorySet = new Set(categories);

      items.forEach((item, itemIdx) => {
        if (item && item.category && !categorySet.has(item.category)) {
          errors.push(`Step [${idx}]: Item "${item.word}" has category "${item.category}" which is not defined in categories list [${categories.join(', ')}]`);
        }
      });

      // Word uniqueness within a step
      const wordsSeen = new Set();
      items.forEach((item) => {
        if (item && item.word) {
          if (wordsSeen.has(item.word)) {
            errors.push(`Step [${idx}]: Duplicate word "${item.word}" in sort items`);
          } else {
            wordsSeen.add(item.word);
          }
        }
      });
    }

    // Select step with order mode alignment
    if (step.step_type === 'select' && step.select_mode === 'order') {
      const options = step.options || [];
      const answer = step.answer || [];

      // Check set equality (permutation check)
      const optionsSorted = [...options].sort();
      const answerSorted = [...answer].sort();

      const optionDiff = options.filter(opt => !answer.includes(opt));
      const answerDiff = answer.filter(ans => !options.includes(ans));

      if (optionDiff.length > 0) {
        errors.push(`Step [${idx}]: Option(s) [${optionDiff.join(', ')}] are not included in the answer array`);
      }
      if (answerDiff.length > 0) {
        errors.push(`Step [${idx}]: Answer item(s) [${answerDiff.join(', ')}] are not present in options array`);
      }
      if (options.length !== answer.length) {
        errors.push(`Step [${idx}]: Options array length (${options.length}) does not match answer array length (${answer.length})`);
      }
    }

    // Build step target to word bank check (multi-set coverage)
    if (step.step_type === 'build') {
      const target = step.target || '';
      const wordBank = step.word_bank || [];

      const targetWords = target.split(/\s+/).map(normalizeWord).filter(Boolean);
      const bankWords = wordBank.map(normalizeWord);

      // Count bank occurrences
      const bankCounts = {};
      bankWords.forEach(word => {
        bankCounts[word] = (bankCounts[word] || 0) + 1;
      });

      // Count target occurrences
      const targetCounts = {};
      targetWords.forEach(word => {
        targetCounts[word] = (targetCounts[word] || 0) + 1;
      });

      const missingWords = [];
      const insufficientCountWords = [];

      Object.entries(targetCounts).forEach(([word, count]) => {
        if (!bankCounts[word]) {
          missingWords.push(word);
        } else if (bankCounts[word] < count) {
          insufficientCountWords.push(`"${word}" (requires ${count}, only ${bankCounts[word]} in bank)`);
        }
      });

      if (missingWords.length > 0) {
        errors.push(`Step [${idx}]: Target word(s) [${missingWords.join(', ')}] not found in word_bank`);
      }
      if (insufficientCountWords.length > 0) {
        errors.push(`Step [${idx}]: Insufficient count in word_bank for: ${insufficientCountWords.join(', ')}`);
      }
    }
  });

  return {
    success: errors.length === 0,
    errors
  };
}

/**
 * Runs validation over all files in the target directory.
 * @param {string} dirPath Directory path.
 * @param {object} validate Compiled AJV validator.
 * @returns {object} { passed: number, failed: number }
 */
function validateDirectory(dirPath, validate) {
  if (!fs.existsSync(dirPath)) {
    console.warn(`\x1b[33mWarning: Directory "${dirPath}" does not exist. Creating it.\x1b[0m`);
    fs.mkdirSync(dirPath, { recursive: true });
    return { passed: 0, failed: 0 };
  }

  const files = fs.readdirSync(dirPath).filter(file => file.endsWith('.json') && file !== 'lesson.schema.json');

  if (files.length === 0) {
    console.log('\x1b[33mNo lesson files found in directory.\x1b[0m');
    return { passed: 0, failed: 0 };
  }

  let passed = 0;
  let failed = 0;

  files.forEach(file => {
    const filePath = path.join(dirPath, file);
    const result = validateLessonFile(filePath, validate);
    
    if (result.success) {
      // Find length of steps to print
      try {
        const steps = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        console.log(`  \x1b[32m✓ PASS\x1b[0m  ${file} (${steps.length} steps)`);
      } catch (e) {
        console.log(`  \x1b[32m✓ PASS\x1b[0m  ${file}`);
      }
      passed++;
    } else {
      console.log(`  \x1b[31m✗ FAIL\x1b[0m  ${file}`);
      result.errors.forEach(err => {
        console.log(`    \x1b[31m- ${err}\x1b[0m`);
      });
      failed++;
    }
  });

  return { passed, failed };
}

/**
 * Main execution.
 */
function main() {
  const isTest = process.argv.includes('--test');

  // Verify Schema exists
  if (!fs.existsSync(schemaPath)) {
    console.error(`\x1b[31mError: Schema file not found at "${schemaPath}".\x1b[0m`);
    process.exit(1);
  }

  let schema;
  try {
    schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
  } catch (err) {
    console.error(`\x1b[31mError: Failed to parse schema file: ${err.message}\x1b[0m`);
    process.exit(1);
  }

  const validate = ajv.compile(schema);

  if (isTest) {
    console.log('Running schema validator self-tests using test-fixtures...');
    const result = validateDirectory(testFixturesDir, validate);
    console.log(`\nSelf-test Results: ${result.passed} passed, ${result.failed} failed\n`);
    
    // We expect certain failures in the fixtures. The calling process should handle this or verify.
    // If we want our self-test suite to report exit code 0 when it matches expected behavior:
    // Let's check files directly and verify they match expectations.
    const expected = {
      'valid_lesson.json': true,
      'invalid_missing_field.json': false,
      'invalid_sort_category.json': false,
      'invalid_build_target.json': false
    };

    let testSuitePassed = true;
    for (const [filename, expectedSuccess] of Object.entries(expected)) {
      const filePath = path.join(testFixturesDir, filename);
      if (!fs.existsSync(filePath)) {
        console.error(`\x1b[31mMissing expected test fixture: ${filename}\x1b[0m`);
        testSuitePassed = false;
        continue;
      }
      const res = validateLessonFile(filePath, validate);
      if (res.success !== expectedSuccess) {
        console.error(`\x1b[31mSelf-test FAILED: ${filename} expected success=${expectedSuccess}, got success=${res.success}\x1b[0m`);
        testSuitePassed = false;
      } else {
        console.log(`\x1b[32mSelf-test PASSED: ${filename} correctly evaluated to ${res.success ? 'PASS' : 'FAIL'}\x1b[0m`);
      }
    }

    process.exit(testSuitePassed ? 0 : 1);
  } else {
    console.log(`Validating lesson files in "${lessonsDir}"...`);
    const result = validateDirectory(lessonsDir, validate);
    console.log(`\nValidation Results: ${result.passed} passed, ${result.failed} failed`);
    process.exit(result.failed > 0 ? 1 : 0);
  }
}

main();
