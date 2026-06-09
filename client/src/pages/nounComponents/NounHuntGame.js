import React, { useState } from "react";
import PARAGRAPHS from "./nounHuntData";
import NounHuntParagraph from "./NounHuntParagraph";
import NounHuntPopup from "./NounHuntPopup";
import NounHuntResults from "./NounHuntResults";

const NounHuntGame = () => {
  const [paragraphIndex, setParagraphIndex] = useState(0);
  const [tokenStates, setTokenStates] = useState({});
  const [popup, setPopup] = useState(null); 
  const [score, setScore] = useState(0);
  const [wrongClicks, setWrongClicks] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [missed, setMissed] = useState([]);

  const paragraph = PARAGRAPHS[paragraphIndex];
  const totalNouns = paragraph.tokens.filter((t) => t.isNoun).length;
  const correctCount = Object.values(tokenStates).filter((s) => s === "correct").length;

  const handleTokenClick = (token, index, e) => {
    if (tokenStates[index]) return;
    if (token.word === "." || token.word === "," || token.word === "!") return;

    if (!token.isNoun) {
      // Wrong click — flash red briefly
      setWrongClicks((prev) => prev + 1);
      setTokenStates((prev) => ({ ...prev, [index]: "wrong-click" }));
      setTimeout(() => {
        setTokenStates((prev) => {
          const next = { ...prev };
          delete next[index];
          return next;
        });
      }, 600);
      return;
    }

    // Correct noun click and open the type popup
    const rect = e.target.getBoundingClientRect();
    setPopup({ tokenIndex: index, position: { x: rect.left, y: rect.bottom } });
  };

  const handleAnswer = (choice) => {
    const { tokenIndex } = popup;
    const token = paragraph.tokens[tokenIndex];
    const isCorrect = choice === token.type;
    const newState = isCorrect ? "correct" : "wrong-type";

    const newStates = { ...tokenStates, [tokenIndex]: newState };
    setTokenStates(newStates);
    if (isCorrect) setScore((prev) => prev + 1);
    setPopup(null);

    // Check if all nouns have been answered
    const answeredNouns = Object.keys(newStates).filter(
      (k) => paragraph.tokens[k]?.isNoun
    ).length;

    if (answeredNouns === totalNouns) {
      const missedList = paragraph.tokens
        .filter((t, i) => t.isNoun && newStates[i] !== "correct")
        .map((t) => ({ word: t.word, type: t.type }));
      setTimeout(() => {
        setMissed(missedList);
        setGameOver(true);
      }, 400);
    }
  };

  const handleReplay = () => {
    setTokenStates({});
    setPopup(null);
    setScore(0);
    setWrongClicks(0);
    setGameOver(false);
    setMissed([]);
    setParagraphIndex((paragraphIndex + 1) % PARAGRAPHS.length);
  };

  // Results screen
  if (gameOver) {
    return (
      <div style={{ fontFamily: "'Inter', sans-serif", background: "#fde8c8", minHeight: "100%", padding: "24px", borderRadius: "20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
          <span style={{ fontSize: "1.3rem" }}>🔍</span>
          <h2 style={{ margin: 0, fontSize: "1.3rem", fontWeight: "900", color: "#e85d04" }}>Noun Hunt</h2>
        </div>
        <NounHuntResults
          score={score}
          total={totalNouns}
          missed={missed}
          onReplay={handleReplay}
        />
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#fde8c8", minHeight: "100%", padding: "24px", borderRadius: "20px" }}>

      {/* Title */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
        <span style={{ fontSize: "1.3rem" }}>🔍</span>
        <h2 style={{ margin: 0, fontSize: "1.3rem", fontWeight: "900", color: "#e85d04" }}>Noun Hunt</h2>
      </div>

      {/* Progress card */}
      <div style={{
        background: "white",
        border: "3px solid #1a1a2e",
        borderRadius: "16px",
        padding: "16px 20px",
        marginBottom: "16px",
        boxShadow: "4px 4px 0px #1a1a2e",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
          <span style={{ fontWeight: "800", fontSize: "0.95rem", color: "#1a1a2e" }}>Nouns Found</span>
          <span style={{ fontWeight: "800", fontSize: "0.95rem", color: "#1a1a2e" }}>{correctCount} / {totalNouns}</span>
        </div>
        <div style={{ background: "#e5e7eb", borderRadius: "999px", height: "10px", border: "2px solid #1a1a2e" }}>
          <div style={{
            background: "#00e5cc",
            height: "100%",
            borderRadius: "999px",
            width: `${(correctCount / totalNouns) * 100}%`,
            transition: "width 0.3s ease",
          }} />
        </div>
      </div>

      {/* Main game card */}
      <div style={{
        background: "white",
        border: "3px solid #1a1a2e",
        borderRadius: "20px",
        padding: "24px",
        boxShadow: "5px 5px 0px #1a1a2e",
      }}>

        <div style={{
          background: "#00e5cc",
          border: "2.5px solid #1a1a2e",
          borderRadius: "10px",
          padding: "10px 14px",
          marginBottom: "20px",
        }}>
          <p style={{ margin: 0, fontSize: "0.9rem", fontWeight: "800", color: "#1a1a2e" }}>
            📖 Click every noun — then identify its type. Yellow words are nouns!
          </p>
        </div>

        {/* Paragraph */}
        <NounHuntParagraph
          tokens={paragraph.tokens}
          tokenStates={tokenStates}
          onTokenClick={handleTokenClick}
        />

        {/* Wrong click counter */}
        {wrongClicks > 0 && (
          <p style={{ marginTop: "12px", fontSize: "0.85rem", fontWeight: "700", color: "#dc2626", textAlign: "right" }}>
            ❌ {wrongClicks} wrong click{wrongClicks > 1 ? "s" : ""}
          </p>
        )}

        {/* Paragraph indicator */}
        <p style={{ marginTop: "14px", fontSize: "0.8rem", fontWeight: "700", color: "#9ca3af", textAlign: "center" }}>
          Paragraph {paragraphIndex + 1} of {PARAGRAPHS.length}
        </p>
      </div>

      {/* Type choice popup */}
      {popup && (
        <NounHuntPopup
          token={paragraph.tokens[popup.tokenIndex]}
          onAnswer={handleAnswer}
          onClose={() => setPopup(null)}
          position={popup.position}
        />
      )}
    </div>
  );
};

export default NounHuntGame;
