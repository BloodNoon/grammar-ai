# TypeGame Engine Specification

This document specifies the technical design, input validation, and normalization rules for the **TypeGame** engine (where `step_type: "type"`). This engine powers fill-in-the-blank and direct-typing questions.

---

## 1. UX & Interaction Model

### 1.1 Layout Structure
- **Instruction Zone**: The `prompt_text` (e.g., *"Type the past tense of 'teach'."*).
- **Input Slot**: A standard text input field.
- **Feedback Zone**: A space to display the `hint` (if the user struggles) or `explanation` (upon completion).

### 1.2 UX Flow
1. User types an answer into the input field.
2. User presses "Enter" or clicks a "Check" button.
3. If correct: Highlight green, disable input, show `explanation`, and allow progression.
4. If incorrect: Highlight red, clear input (or keep to allow edit), and optionally show `hint`.

---

## 2. Array-Based Answer Normalization (Crucial)

To support synonyms, alternate spellings, and capitalization variants, **the `answer` field is ALWAYS an array of strings**. 

**Example Schema:**
```json
{
  "id": "type-verb-past",
  "step_type": "type",
  "prompt_text": "Type the past tense of 'teach'.",
  "answer": ["taught", "Taught"], 
  "case_sensitive": false,
  "explanation": "'Taught' is an irregular past tense verb."
}
```

### 2.1 The Validation Logic
When the user submits their input, the engine must check if their input matches **ANY** string in the `answer` array.

```javascript
// Conceptual Logic for Dev B
const isCorrect = step.answer.some(validAnswer => {
  return compareStrings(userInput, validAnswer, step.case_sensitive);
});
```

### 2.2 String Comparison (`compareStrings`)
Before comparing the user's input to a valid answer in the array, the engine must perform cleanup to prevent frustrating false negatives:

1. **Trim whitespace**: Remove leading and trailing spaces from both strings.
2. **Punctuation Stripping**: Unless specifically testing punctuation, strip trailing periods or commas (e.g., "taught." becomes "taught").
3. **Case Sensitivity**: 
   - If `case_sensitive: false` (the default assumption if omitted), convert BOTH the user input and the array strings to `.toLowerCase()` before checking.
   - If `case_sensitive: true`, perform an exact string match (after trimming).

---

## 3. Edge Cases for Dev B

- **Empty Submission**: If the user submits an empty string `""`, it should immediately be marked incorrect without matching against the array.
- **Single Answers**: Even if there is only one correct answer (e.g., `answer: ["pride"]`), it will still be passed as an array. The engine must *always* iterate or use `.some()`. Do not assume `answer` is a string.
