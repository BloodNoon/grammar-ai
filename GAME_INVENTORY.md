# StudentsWriting — Game & Practice Inventory

> This document exists because the game architecture in this codebase is split across **three separate, non-sharing systems**. If you are trying to add, edit, or remove a game, read this first.

---

## The Three Systems (Why It's Confusing)

| System | Location | How It Works |
|--------|----------|--------------|
| **A. JSON Bank + Reusable Wrappers** | `client/src/data/*.json` + `client/src/components/*Wrapper.js` | Questions live in JSON files. Three generic React wrappers render them as games. |
| **B. Hardcoded SentenceChecker Games** | `client/src/utils/SentenceChecker/*.js` | Each game is a standalone React file. Questions, answers, and logic are baked into the component code. |
| **C. Final Knowledge Check Quizzes** | `client/src/pages/*quiz.js` | Pull 10 random questions from the same JSON banks and present them as a static quiz page. |

**Important:** Systems A and B do NOT share code. For example, "Noun Practice" exists twice:
- System A: `nounPractice.js` uses `nouns_questions.json` + `SortingGameWrapper.js` / `TypingGameWrapper.js` / `multipleChoiceWrapper.js`
- System B: `NounsPage.js` embeds `NounPronounSorter.js`, `NounSentenceBuilder.js`, `NounTypingGame.js`, and `PronounReplacement.js` directly into its stepper cards.

If you edit a question in `nouns_questions.json`, it will **NOT** affect the games on `NounsPage.js`.

---

## System A: JSON Question Banks + Reusable Game Engines

### The Three Reusable Game Engines

These are the only components that read from JSON files.

| Engine | File | Mechanic |
|--------|------|----------|
| **Multiple Choice Wrapper** | `client/src/components/multipleChoiceWrapper.js` | Multi-select cards. Presents a question with clickable options. Supports "select all that apply." |
| **Typing Game Wrapper** | `client/src/components/typingGameWrapper.js` | Input field where the user types the exact answer. |
| **Sorting Game Wrapper** | `client/src/components/SortingGameWrapper.js` | Drag-and-drop words into category buckets. |

**All three engines shuffle and slice the JSON data to 15 questions per round.** They also loop the user until they get 100% accuracy (0 mistakes).

### JSON Question Banks

| File | Total Qs | `multiple_choice` | `typing` | `sorting` | Used By |
|------|----------|-------------------|----------|-----------|---------|
| `data/adjectives_questions.json` | 150 | 75 | 75 | — | `adjectivePractice.js` |
| `data/adverbs_questions.json` | 150 | 75 | 75 | — | `adverbPractice.js` |
| `data/articles_questions.json` | 150 | 50 | 55 | 45 | `articlePractice.js` |
| `data/conjunctions_questions.json` | 150 | 75 | 75 | — | `conjunctionPractice.js` |
| `data/nouns_questions.json` | 140 | 48 | 51 | 41 | `nounPractice.js` |
| `data/prepositions_questions.json` | 150 | 75 | 75 | — | `prepositionPractice.js` |
| `data/pronouns_questions.json` | 28 | 28 | — | — | *(orphaned, no practice page)* |
| `data/questions.json` | 53 | Mixed | Mixed | Mixed | *(legacy, not tied to a specific practice page)* |
| `data/verbs_questions.json` | 149 | 45 | 52 | 52 | `verbPractice.js` |

### Dedicated Practice Pages (System A Entry Points)

These pages import the JSON file, filter questions by `practice_type`, and pass them into the wrapper engines inside `GameCard` components.

| Topic | Practice Page | Games Available |
|-------|---------------|-----------------|
| Adjectives | `pages/adjectivePage/adjectivePractice.js` | Multiple Choice, Typing Practice |
| Adverbs | `pages/adverbPage/adverbPractice.js` | Multiple Choice, Typing Practice |
| Articles | `pages/articlePractice.js` | Multiple Choice, Typing Practice, Sorting Game |
| Conjunctions | `pages/conjunctionPractice.js` | Multiple Choice, Typing Practice |
| Nouns | `pages/nounPractice.js` | Multiple Choice, Typing Practice, Sorting Game |
| Prepositions | `pages/prepositionPractice.js` | Multiple Choice, Typing Practice |
| Verbs | `pages/verbPractice.js` | Multiple Choice, Typing Practice, Sorting Game |

---

## System B: Hardcoded SentenceChecker Games

These games live entirely inside `client/src/utils/SentenceChecker/`. They do **NOT** use JSON question banks. Every question, answer key, and drag-and-drop category is written directly in the component's JavaScript.

These games are imported by the **Lesson Pages** (the pages with the video cards and the "Next Practice →" stepper).

### Noun Lessons (`NounsPage.js`, `pluralNoun.js`, `PossessiveNouns.js`)

| Game Component | Mechanic | Used In |
|----------------|----------|---------|
| `NounPronounSorter.js` | Drag & drop nouns/pronouns into buckets | `NounsPage.js` (Practice 1) |
| `PronounReplacement.js` | Click a word to replace it with a pronoun | `NounsPage.js` (Practice 2) |
| `NounSentenceBuilder.js` | Click words to assemble a sentence | `NounsPage.js` (Practice 3) |
| `NounTypingGame.js` | Type the correct noun form | `NounsPage.js` (Practice 4) |
| `PluralRuleSorter.js` | Drag & drop plural rules | `pluralNoun.js` (Practice 1) |
| `PluralTypingGame.js` | Type the plural form | `pluralNoun.js` (Practice 2) |
| `PossessiveSorter.js` | Drag & drop possessive rules | `PossessiveNouns.js` (Practice 1) |
| `PossessiveTypingGame.js` | Type the possessive form | `PossessiveNouns.js` (Practice 2) |

### Article Lesson (`ArticleStructure.js`)

| Game Component | Mechanic |
|----------------|----------|
| `ArticleGrammarLegend.js` | Reference / info card |
| `ArticleSentenceBuilder.js` | Click-to-build sentences |
| `ArticleLevelSelection.js` | Level picker UI |
| `ArticleWordBank.js` | Word bank for sentence building |

### Verb Tense Lesson (`VerbTenseStructure.js`)

| Game Component | Mechanic |
|----------------|----------|
| `VerbTenseLesson.js` | Lesson content |
| `VerbProgressTracker.js` | Progress bar UI |
| `VerbCompletionCelebration.js` | Confetti / success modal |
| `VerbLevelSelection.js` | Beginner / Intermediate / Advanced picker |
| `VerbWordBank.js` | Categorized word bank (Pronoun, Noun, Verb, Auxiliary, etc.) |
| `VerbSentenceBuilder.js` | Drag/click words from bank to build sentence |
| `VerbActionButtons.js` | Check / reset buttons |
| `VerbFeedbackDisplay.js` | Correct / incorrect feedback |
| `VerbTypingQuiz.js` | Type-the-answer quiz (target: 10 correct) |

### Adjective Lesson (`adjectiveStructure.js`)

| Game Component | Mechanic |
|----------------|----------|
| `AdjectiveLesson.js` | Lesson content |
| `AdjectiveQuiz.js` | In-lesson quiz |
| `AdjectiveFillBlanks.js` | Fill-in-the-blanks |
| `AdjectiveRoyalOrder.js` | Ordering game (Opinion → Size → Color...) |
| `AdjectiveSentenceStructures.js` | Sentence pattern builder |
| `AdjectiveSortingGame.js` | Drag & drop adjectives into categories |

### Adverb Lesson (`adverbPage.js`)

| Game Component | Mechanic |
|----------------|----------|
| `AdverbLesson.js` | Lesson content |
| `AdverbTypes.js` | Type reference |
| `AdverbForms.js` | Form reference |
| `AdverbIdentificationGame.js` | Click / select the adverb |
| `AdverbTypeSorting.js` | Drag & drop adverbs into types (Manner, Time, Place...) |
| `AdverbRoyalOrder.js` | Ordering game |
| `AdverbSentenceStructures.js` | Sentence pattern builder |

### Conjunction Lesson (`conjunctionStructure.js`)

| Game Component | Mechanic |
|----------------|----------|
| `ConjunctionSorter.js` | Drag & drop into Coordinating / Subordinating / Correlative |
| `ConjunctionFillBlanks.js` | Choose "Comma" or "No Comma" |
| `ConjunctionStructureGame.js` | Complex sentence builder |

### Preposition Lessons (Prep1 / Prep2 / Prep3)

**Prep1** (`prep1Structure.js`)
| Game Component | Mechanic |
|----------------|----------|
| `PrepositionSorter.js` | Drag & drop prepositions into categories |
| `PrepositionFillBlanks.js` | Select / type the correct preposition |
| `PrepositionStructureGame.js` | Match sentence to structural pattern |

**Prep2** (`prep2Structure.js`)
| Game Component | Mechanic |
|----------------|----------|
| `PrepositionPhraseLesson.js` | Lesson content |
| `PrepositionPhraseFillBlanks.js` | Fill in blanks for prepositional phrases |
| `PrepositionPhraseWordBlocks.js` | Click word blocks to build a phrase |
| `PrepositionPhraseSorting.js` | Drag & drop phrase types |

**Prep3** (`prep3Structure.js`)
| Game Component | Mechanic |
|----------------|----------|
| `SentenceScramble.js` | Reorder scrambled words into a sentence |
| `PrepositionBuilder.js` | Click words to build a compound preposition sentence |

### Pronoun Lesson (implied by `PronounTenseStructure.js` and related files)

| Game Component | Mechanic |
|----------------|----------|
| `PronounSentenceBuilder.js` | Click-to-build |
| `PronounFillBlanks.js` | Fill in the blank |
| `PronounWordBank.js` | Categorized word bank |
| `PronounTenseStructure.js` | Sentence structure checker |
| `PronounQuiz.js` | Multiple choice |
| `PronounReplacement.js` | Click to replace nouns with pronouns |
| `PronounsLesson.js` | Lesson content |

### Standalone / Shared Utilities

| Game Component | Used By | Mechanic |
|----------------|---------|----------|
| `SubjectNounGame.js` | `SentenceStructure.js` | Identify the subject noun |
| `SubjectQuiz.js` | `SentenceStructure.js` | Quiz on subjects |
| `StructureFormulaGame.js` | Adjective lesson | Match sentence to formula |
| `SentenceStructure.js` | `SentenceStructure.js` (the page itself) | NLP tagging demo + subject games |
| `StructureChecker.js` | `VerbTenseStructure.js`, others | Shared grammar validation logic |
| `TestCases.js` | `SentenceStructure.js` | Array of test sentences for the NLP demo |
| `Plugin.js` | *(unknown)* | Small utility plugin |

---

## System C: Final Knowledge Check Quizzes

These are standalone pages that pull **10 random single-answer questions** from the JSON banks and present them in a grid layout with a sidebar progress tracker.

| Quiz Page | JSON Source |
|-----------|-------------|
| `pages/adjquiz.js` | `data/adjectives_questions.json` |
| `pages/adverbQuiz.js` | `data/adverbs_questions.json` |
| `pages/verbTenseQuiz.js` | `data/verbs_questions.json` |
| `pages/articleQuiz.js` | `data/articles_questions.json` |
| `pages/prepositionQuiz.js` | `data/prepositions_questions.json` |
| `pages/ConjunctionQuiz.js` | `data/conjunctions_questions.json` |

---

## The Practice Menu (`PracticeMenu.js`)

This is the main landing grid at `/practice-menu`. It shows 7 topic cards:

1. **Nouns** → `/nouns`
2. **Articles** → `/article-structure`
3. **Verb Tenses** → `/verb-tense-structure`
4. **Adjectives** → `/adjective-structure`
5. **Adverbs** → `/adverb-structure`
6. **Prepositions** → `/prep1-structure`
7. **Conjunctions** → `/conjunction-structure`

Each card routes to a **Lesson Page** (System B), NOT the dedicated practice page (System A). The dedicated practice pages are only reachable via the top nav (`MainNav.js`) dropdown menus.

---

## Navigation (`MainNav.js`)

The top bar appears on all lesson and practice pages. It has dropdowns that link to:
- Lesson pages (System B)
- Dedicated Practice pages (System A)
- Quizzes (System C)

Example: The **Noun Lessons** dropdown contains:
- Introduction to Nouns (`/nouns`)
- Plural Nouns Lesson (`/plural-noun`)
- Possessive Nouns (`/possessive-nouns`)
- Noun Practice Games (`/noun-practice`) ← System A
- Noun Quiz (`/NounQuizPageTest`) ← System C

---

## Non-Game App Features

These parts of the app have nothing to do with the practice games:

| Feature | Route | Files |
|---------|-------|-------|
| **Landing Page** | `/` | `pages/Home.js`, `components/Hero.js`, `components/HomeIntro.js`, `components/HomeFeature.js` |
| **Auth** | `/login`, `/signup` | `pages/Login.js`, `pages/Signup.js`, `contexts/AuthContext.js` |
| **User Dashboard** | `/dashboard` | `pages/Dashboard.js`, `components/DashboardProfile.js`, `components/ProgressDashboard.js`, `components/UserList.js` |
| **Writing Prompts** | `/prompts`, `/overview/:id` | `pages/PromptList.js`, `pages/PromptOverview.js`, `components/PromptMainSection.js`, `components/PromptInputSection.js`, `components/Post.js` |
| **Sentence Analyzer** | `/sentence-structure` | `pages/SentenceStructure.js` — standalone NLP sentence tagger using `compromise` |

---

## Quick Reference: If You Want To...

| Task | Where To Go |
|------|-------------|
| **Add a new question** to an existing bank | Edit the relevant `client/src/data/[topic]_questions.json` file. It will appear in System A and System C automatically. It will **NOT** affect System B. |
| **Edit a hardcoded game** | Edit the relevant `client/src/utils/SentenceChecker/[GameName].js` file. |
| **Change how Multiple Choice looks/works** | Edit `client/src/components/multipleChoiceWrapper.js` and `client/src/components/multipleChoiceGame.js`. |
| **Change how Typing games look/works** | Edit `client/src/components/typingGameWrapper.js` and `client/src/components/typingGame.js`. |
| **Change how Sorting games look/works** | Edit `client/src/components/SortingGameWrapper.js` and `client/src/components/sortingComponent.js`. |
| **Add a completely new game type** | You will need to either: (1) build a new wrapper in `client/src/components/`, or (2) build a new hardcoded game in `client/src/utils/SentenceChecker/`. Pick one system and stick to it. |
| **Remove the duplication** (merge System A + B) | The cleanest approach is to migrate all hardcoded games in `SentenceChecker/` to use the JSON bank + wrapper pattern. That means rewriting `NounPronounSorter.js`, `PrepositionSorter.js`, etc. to read from JSON and render via the generic wrappers. |

---

## File Count Summary

- **JSON Banks:** 9 files
- **Reusable Game Engines (Wrappers):** 3 files + 3 core game components = 6 files
- **Hardcoded SentenceChecker Games:** 50+ files
- **Quiz Pages:** 6 files
- **Practice Pages (System A entry points):** 7 files
- **Lesson Pages (System B entry points):** 10+ files
- **Shared UI:** `components/ui.js` (or `components/ui/`), `components/GameCard.js`, `components/PageContainer.js`
