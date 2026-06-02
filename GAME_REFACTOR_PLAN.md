# Standardize Practice Games — Unified JSON-Driven Architecture

Migrate all practice games from hardcoded React components (System B) into four reusable JSON-driven engines (System A) inside `client/src/components/`, fed by structured lesson JSONs in `client/src/data/lessons/`, with dropped "Check" games replaced by static lesson demos.

---

## 1. Consolidate to Four Engines

Remove System B hardcoded games. Extend System A so **all** interactive practice is rendered by these four generic wrappers:

| Engine | `practice_type` | Covers | Existing Wrapper |
|--------|----------------|--------|------------------|
| **SelectGame** | `select` | Multiple choice, identification, replacement, ordering | `multipleChoiceGame.js` |
| **TypeGame** | `type` | Typing, fill-in-the-blank | `typingGame.js` |
| **SortGame** | `sort` | Categorizing, sorting, sequencing | `sortingComponent.js` |
| **BuildGame** | `build` | Sentence building, word assembly | **New** |

**Dropped:** `check` (pattern matching / structure checking) becomes a static lesson demo instead of an interactive game.

**Kept as special components:** Sandbox builders (`VerbTenseStructure.js`, `ArticleStructure.js`, etc.) remain standalone lesson tools, not part of the 4 engines.

---

## 2. JSON Schema Definitions (`client/src/data/lessons/`)

Each lesson is an array of step objects. Every step has a `step_type`.

### A. `lesson` step (Video / Explanation / Static Demo)
```json
{
  "step_type": "lesson",
  "title": "What is a Noun?",
  "content": "A noun is a person, place, thing, or idea...",
  "media_url": "optional_video_or_image"
}
```

### B. `select` step
```json
{
  "step_type": "select",
  "question_text": "Which word is a proper noun?",
  "options": ["city", "Paris", "fast", "run"],
  "answer": ["Paris"],
  "explanation": "Paris is a specific place and is capitalized.",
  "select_mode": "single"
}
```

### C. `type` step
```json
{
  "step_type": "type",
  "prompt_text": "Type the past tense of 'teach'.",
  "answer": ["taught"],
  "hint": "Irregular verb.",
  "explanation": "'Taught' is the correct past tense.",
  "case_sensitive": false
}
```

### D. `sort` step
```json
{
  "step_type": "sort",
  "instructions": "Drag each word into the correct category.",
  "items": [
    { "word": "city", "category": "Common" },
    { "word": "Paris", "category": "Proper" }
  ],
  "categories": ["Common", "Proper"],
  "explanation": "Proper nouns name specific things and are capitalized."
}
```

### E. `build` step
```json
{
  "step_type": "build",
  "instructions": "Build the sentence using the word blocks.",
  "target": "Sarah walked to the store.",
  "word_bank": ["Sarah", "walked", "to", "the", "store", "quickly"],
  "required_words": ["Sarah", "walked", "to", "the", "store"],
  "allow_extra": false,
  "explanation": "This follows the pattern: Pronoun + Verb + Preposition + Article + Noun."
}
```

---

## 3. File & Folder Changes

| Action | From | To |
|--------|------|-----|
| **Create** | — | `client/src/components/BuildGame.js` |
| **Create** | — | `client/src/data/lessons/` (new folder for lesson JSONs) |
| **Migrate** | `client/src/utils/SentenceChecker/*.js` (hardcoded games) | Extract question data into `client/src/data/lessons/<topic>_lesson.json` |
| **Migrate** | `client/src/data/*_questions.json` (old System A banks) | Merge into `client/src/data/lessons/<topic>_lesson.json` under `select`, `type`, `sort` steps |
| **Keep** | `client/src/components/multipleChoiceGame.js` | Refactor to `SelectGame.js` (add `select_mode: single | multi`) |
| **Keep** | `client/src/components/typingGame.js` | Refactor to `TypeGame.js` (add optional `word_bank`) |
| **Keep** | `client/src/components/sortingComponent.js` | Refactor to `SortGame.js` (support `items` array) |
| **Keep** | Sandbox builders (`VerbTenseStructure.js`, etc.) | Leave as standalone lesson components |
| **Delete** | `client/src/utils/SentenceChecker/PrepositionStructureGame.js` etc. | Remove after data is migrated |
| **Update** | `client/src/pages/*Practice.js` | Refactor to load `client/src/data/lessons/<topic>_lesson.json` and render the 4 engines |

---

## 4. Lesson Page Refactor

Each topic page (e.g., `NounsPage.js`) becomes a **stepper** that reads its JSON and renders steps:

```js
const steps = lessonData; // loaded from data/lessons/nouns_lesson.json

steps.map(step => {
  if (step.step_type === 'lesson') return <LessonStep data={step} />;
  if (step.step_type === 'select') return <SelectGame question={step} />;
  if (step.step_type === 'type') return <TypeGame question={step} />;
  if (step.step_type === 'sort') return <SortGame question={step} />;
  if (step.step_type === 'build') return <BuildGame question={step} />;
});
```

This eliminates the duplication where `NounsPage.js` and `nounPractice.js` had separate games for the same topic.

---

## 5. Migration Priority

| Priority | Topic | Why |
|----------|-------|-----|
| 1 | **Prepositions** | Most System B files; best proof of concept |
| 2 | **Nouns** | Has both System A and B; clear consolidation win |
| 3 | **Conjunctions** | Heavy on BuildGame; tests the new engine |
| 4 | **Adjectives / Adverbs** | Medium complexity |
| 5 | **Articles / Verbs** | Already mostly System A; light cleanup |
| 6 | **Final Quizzes** | Refactor to load `select` steps from lesson JSONs |

---

## 6. Deliverables

1. `client/src/components/BuildGame.js`
2. Refactored `SelectGame.js`, `TypeGame.js`, `SortGame.js`
3. `client/src/data/lessons/<topic>_lesson.json` for each grammar topic
4. Refactored lesson pages (`NounsPage.js`, `Prep1Structure.js`, etc.) using the stepper pattern
5. Deleted obsolete `SentenceChecker` game files
6. Updated `App.js` routes (remove redundant `/noun-practice`, keep unified `/nouns`)
