# SortGame Engine Specification

This document specifies the technical design, runtime behavior, and validation rules for the **SortGame** engine (where `step_type: "sort"`). This engine powers categorization and classification exercises (e.g., Common vs. Proper Nouns, Adverb Types).

---

## 1. UX & Interaction Model

### 1.1 Layout Structure
- **Instruction Zone**: The `instructions` text (e.g., *"Drag each word into the correct category."*).
- **Item Pool (Source)**: A flex-wrap area containing the word tokens to be sorted.
- **Categories (Buckets)**: Two or more distinct containers (buckets) where items can be placed.

### 1.2 Interactive Mechanics
- **Drag-and-Drop**: The primary mechanic. Users drag a token from the pool into a category bucket.
- **Click-to-Assign (Fallback/Accessibility)**: Clicking a token in the pool opens a small context menu or cycles through categories to move the token.
- **Visual Feedback**: Buckets should highlight or "glow" when a token is dragged over them.
- **Undo**: Users can drag a token out of a bucket back to the pool, or drag it directly from one bucket to another.

---

## 2. Validation & Evaluation

Validation occurs when the user clicks the "Check" button. It is a binary (All-or-Nothing) evaluation.

### 2.1 Success Criteria
A submission is **Correct** if and only if:
1. **Completion**: Every item from the pool has been placed into a bucket.
2. **Accuracy**: For every placed item, the bucket's category name matches the item's `category` defined in the JSON.

### 2.2 Normalization
- Category comparison is **exact string matching**. The bucket names in the UI must match the `category` strings in the `items` array exactly.

---

## 3. Data Schema Example

```json
{
  "id": "noun-sort-1",
  "step_type": "sort",
  "instructions": "Sort the nouns into the correct buckets:",
  "categories": ["Common", "Proper"],
  "items": [
    { "word": "city", "category": "Common" },
    { "word": "Paris", "category": "Proper" },
    { "word": "river", "category": "Common" },
    { "word": "London", "category": "Proper" }
  ],
  "explanation": "Proper nouns are specific names and are always capitalized."
}
```

---

## 4. Edge Cases for Dev B

- **Duplicate Words**: If the pool contains two identical words that belong to different categories (e.g., "Park" as a Common Noun and "Park" as part of "Central Park"), each instance must be tracked by its unique index to prevent "ghost" movements in the UI.
- **Mobile Responsiveness**: On small screens, buckets should stack vertically. Use a "tap word, then tap bucket" mechanic if drag-and-drop is unreliable on mobile browsers.
- **Empty Buckets**: The "Check" button should remain disabled until the pool is empty (all items are placed).
