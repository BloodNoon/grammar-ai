// --- Preposition Sorter Game ---
import React, { useState } from "react";

const PrepositionSorter = () => {
  const categories = ["Time", "Place", "Situation", "Direction", "Comparison"];

  const prepositionsByCategory = {
    Time: ["before", "after", "during", "since", "until", "for"],
    Place: ["in", "on", "at", "under", "over", "between"],
    Situation: ["about", "regarding", "concerning", "with", "without", "of"],
    Direction: ["to", "towards", "into", "onto", "through", "across"],
    Comparison: [
      "like",
      "as",
      "than",
      "unlike",
      "similar to",
      "different from",
    ],
  };

  const getSubset = (difficulty) => {
    let subset = {};
    categories.forEach((cat) => {
      const all = prepositionsByCategory[cat];
      let count = all.length;
      if (difficulty === "Easy") {
        count = Math.floor(Math.random() * 2) + 2; // 2–3
      } else if (difficulty === "Medium") {
        count = Math.floor(Math.random() * 3) + 3; // 3–5
      }
      subset[cat] = shuffle([...all]).slice(0, count);
    });
    return subset;
  };

  const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

  const getShuffledList = (prepSet) => {
    const allPreps = Object.values(prepSet).flat();
    return shuffle(allPreps);
  };

  const [started, setStarted] = useState(false);
  const [difficulty, setDifficulty] = useState(null);
  const [prepSet, setPrepSet] = useState({});
  const [wordBank, setWordBank] = useState([]);
  const [slots, setSlots] = useState({});
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);

  const startGame = (level) => {
    let selectedSet =
      level === "Hard" ? prepositionsByCategory : getSubset(level);
    setPrepSet(selectedSet);
    setWordBank(getShuffledList(selectedSet));
    setDifficulty(level);
    setStarted(true);
  };

  const onDragStart = (e, prep) => {
    e.dataTransfer.setData("prep", prep);
  };

  const onDrop = (e, category) => {
    const prep = e.dataTransfer.getData("prep");
    if (!prep || checked) return;

    let newSlots = { ...slots };
    for (let cat in newSlots) {
      newSlots[cat] = newSlots[cat]?.filter((p) => p !== prep);
    }

    let newBank = wordBank.filter((p) => p !== prep);

    if (!newSlots[category]) newSlots[category] = [];
    newSlots[category].push(prep);

    setSlots(newSlots);
    setWordBank(newBank);
  };

  const onDropWordBank = (e) => {
    const prep = e.dataTransfer.getData("prep");
    if (!prep || checked) return;

    let newBank = [...wordBank, prep];
    let newSlots = { ...slots };
    for (let cat in newSlots) {
      newSlots[cat] = newSlots[cat]?.filter((p) => p !== prep);
    }

    setWordBank(newBank);
    setSlots(newSlots);
  };

  const allowDrop = (e) => e.preventDefault();

  const handleCheck = () => {
    const correctCount = categories.reduce((count, cat) => {
      const correctPreps = prepSet[cat] || [];
      return (
        count +
        (slots[cat] || []).filter((p) => correctPreps.includes(p)).length
      );
    }, 0);
    setScore(correctCount);
    setChecked(true);
  };

  const handleReset = () => {
    setStarted(false);
    setDifficulty(null);
    setPrepSet({});
    setWordBank([]);
    setSlots({});
    setChecked(false);
    setScore(0);
  };

  return (
    <div
      style={{
        marginTop: "2rem",
        padding: "1rem",
        border: "2px solid gray.300",
        borderRadius: "8px",
      }}
    >
      {!started && !difficulty ? (
        <div style={{ textAlign: "center" }}>
          <h3>Are you ready to practice?</h3>
          <button
            onClick={() => setDifficulty("selecting")}
            style={{ padding: "10px 20px", fontSize: "16px" }}
          >
            Start
          </button>
        </div>
      ) : null}

      {difficulty === "selecting" && (
        <div style={{ textAlign: "center" }}>
          <h3>Select Difficulty</h3>
          <button
            onClick={() => startGame("Easy")}
            style={{ margin: "5px", padding: "10px 20px", fontSize: "16px" }}
          >
            Easy
          </button>
          <button
            onClick={() => startGame("Medium")}
            style={{ margin: "5px", padding: "10px 20px", fontSize: "16px" }}
          >
            Medium
          </button>
          <button
            onClick={() => startGame("Hard")}
            style={{ margin: "5px", padding: "10px 20px", fontSize: "16px" }}
          >
            Hard
          </button>
        </div>
      )}

      {started && difficulty !== "selecting" && (
        <div>
          {/* Word Bank */}
          <div
            style={{
              marginBottom: "20px",
              padding: "10px",
              border: "2px dashed gray.500",
              borderRadius: "8px",
              minHeight: "50px",
              background: "#f9f9f9",
            }}
            onDrop={onDropWordBank}
            onDragOver={allowDrop}
          >
            <strong>Word Bank:</strong>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "8px",
                marginTop: "10px",
              }}
            >
              {wordBank.map((prep) => (
                <div
                  key={prep}
                  draggable
                  onDragStart={(e) => onDragStart(e, prep)}
                  style={{
                    padding: "5px 10px",
                    background: "white",
                    border: "1px solid gray.300",
                    borderRadius: "5px",
                    cursor: "grab",
                  }}
                >
                  {prep}
                </div>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "10px",
            }}
          >
            {categories.map((cat) => (
              <div
                key={cat}
                onDrop={(e) => onDrop(e, cat)}
                onDragOver={allowDrop}
                style={{
                  padding: "10px",
                  border: "2px solid gray.700",
                  borderRadius: "8px",
                  minHeight: "100px",
                  background: "#f5f5f5",
                }}
              >
                <strong>{cat}</strong>
                <div
                  style={{
                    marginTop: "10px",
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "5px",
                  }}
                >
                  {(slots[cat] || []).map((prep) => {
                    const correct = prepSet[cat] && prepSet[cat].includes(prep);
                    const bgColor = checked
                      ? correct
                        ? "#c8f7c5"
                        : "#f7c5c5"
                      : "white";
                    return (
                      <div
                        key={prep}
                        draggable={!checked}
                        onDragStart={(e) => onDragStart(e, prep)}
                        style={{
                          padding: "5px 10px",
                          background: bgColor,
                          border: "1px solid gray.300",
                          borderRadius: "5px",
                          cursor: checked ? "default" : "grab",
                        }}
                      >
                        {prep}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Buttons */}
          {!checked &&
            Object.values(slots).flat().length ===
              Object.values(prepSet).flat().length && (
              <button
                onClick={handleCheck}
                style={{
                  marginTop: "20px",
                  padding: "10px 20px",
                  fontSize: "16px",
                  background: "blue.500",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                }}
              >
                Check
              </button>
            )}

          {checked && (
            <div style={{ marginTop: "20px", textAlign: "center" }}>
              <h4>
                Score: {score} / {Object.values(prepSet).flat().length}
              </h4>
              <button
                onClick={handleReset}
                style={{
                  padding: "10px 20px",
                  fontSize: "16px",
                  background: "green.500",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  marginTop: "10px",
                }}
              >
                Play Again
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PrepositionSorter;
