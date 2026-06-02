# Select:Order Game Engine Specification

This document specifies the technical design, UX flow, state machine, and validation rules for the `select_mode: "order"` type of the **SelectGame** engine in the *StudentsWriting* platform. This mode is primarily designed to power games like Adjective and Adverb Royal Order, converting static grammatical references into interactive exercises.

---

## 1. UX & Interaction Model (Click-in-Sequence)

Unlike drag-and-drop mechanics which are complex to construct accessibility paths for and prone to mobile touch issues, the Order mode uses a **click-in-sequence** pattern. This is aligned with the existing click-based builders in the application.

### 1.1 Layout Areas
The Order game interface is divided into three distinct zones:
1. **Question Zone**: Displays the question text and instructions (e.g., *"Place the adjective types in the correct Royal Order."*).
2. **Options Area (Source Pool)**: Contains the items to be ordered, displayed as card buttons.
3. **Slots Area (Destination Slots)**: Contains a sequence of numbered slots representing the positions. The number of slots is equal to the length of the `answer` array.

### 1.2 UX Flow
1. **Initial State**:
   - The options in the *Source Pool* are shuffled before display.
   - The *Destination Slots* are empty. They display dashed borders with numbered index placeholders: `①`, `②`, `③`, etc.
   - The "Check" and "Reset" buttons are disabled.
2. **Card Click (Selection)**:
   - When a card in the *Source Pool* is clicked, it immediately moves to fill the first available slot in the *Destination Slots* (from left to right / top to bottom).
   - In the *Source Pool*, the selected card becomes disabled/dimmed to show it has been used.
   - The corresponding slot displays the option text.
3. **Slot Click (Undo)**:
   - When a filled slot in the *Destination Slots* is clicked, the item inside it is removed.
   - The slot returns to its empty state.
   - The corresponding card in the *Source Pool* is re-enabled.
   - **Compacting behavior**: If a user has filled slots 1, 2, and 3, and clicks slot 2 to undo, slot 2 becomes empty. The next card clicked will fill slot 2 (filling the lowest index first).
4. **Completion**:
   - Once all slots are filled, the "Check" button becomes enabled. The student clicks "Check" to validate their sequence.

---

## 2. Validation & Evaluation

Validation is strict and binary; partial credit is not awarded.

### 2.1 Positional Match
- The student's selection is valid if and only if the item in slot index `i` matches the item in `answer` index `i` for all `0 <= i < answer.length`.
  `slots[i] === answer[i]`
- Item comparison is case-sensitive and string-exact.

### 2.2 Schema Constraints & Invariants
- The `options` array and `answer` array must contain the **exact same elements** (same items, same count), differing only in their order. The lesson schema validator enforces this as a permutation check (set equality + length match).
- The number of slots rendered is exactly `answer.length`.

---

## 3. Adjective and Adverb Royal Order Templates

The main use cases for `select_mode: "order"` are the Royal Order games.

### 3.1 Adjective Royal Order Game
- **Purpose**: Teaches the canonical 10-position order of English adjectives.
- **Visual Design**: The slots and cards should be color-coded to match the original [AdjectiveRoyalOrder.js](../client/src/utils/SentenceChecker/AdjectiveRoyalOrder.js) color scheme:
  - Opinion (e.g., *beautiful*): Purple
  - Size (e.g., *large*): Blue
  - Age (e.g., *old*): Green
  - Color (e.g., *red*): Red
  - Origin (e.g., *Italian*): Orange

**Example Schema**:
```json
{
  "id": "adj-royal-order",
  "step_type": "select",
  "select_mode": "order",
  "question_text": "Put these adjectives in the correct Royal Order (first to last):",
  "options": ["Color", "Opinion", "Origin", "Size"],
  "answer": ["Opinion", "Size", "Color", "Origin"],
  "hint": "Think: OSACO — Opinion, Size, Age, Color, Origin.",
  "explanation": "The correct order of adjectives in English is: Opinion (Opinion) -> Size (Size) -> Color (Color) -> Origin (Origin)."
}
```

### 3.2 Adverb Royal Order Game
- **Purpose**: Teaches the order of adverbs in a sentence: Manner -> Place -> Frequency -> Time -> Purpose.

**Example Schema**:
```json
{
  "id": "adv-royal-order",
  "step_type": "select",
  "select_mode": "order",
  "question_text": "Sort the adverb categories into the correct sentence structure order (first to last):",
  "options": ["Frequency", "Place", "Manner", "Time", "Purpose"],
  "answer": ["Manner", "Place", "Frequency", "Time", "Purpose"],
  "hint": "Remember the sequence: How -> Where -> How often -> When -> Why.",
  "explanation": "Adverbs typically follow the order: Manner (Manner), Place (Place), Frequency (Frequency), Time (Time), Purpose (Purpose)."
}
```

---

## 4. State Transitions

```
[Shuffled Source Pool]
       ↓ (Click item)
[Next Available Slot Filled]
       ↓ (All slots filled)
   [Check Enabled]
       ↓ (Click Check)
   [Correct / Incorrect Feedback]
```
- If correct, display checkmarks and enable the "Next" button.
- If incorrect, highlight incorrect slots in red, but keep the student's selections in place so they can click them to remove/replace them.
