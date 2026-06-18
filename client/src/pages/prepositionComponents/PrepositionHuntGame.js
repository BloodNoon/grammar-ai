import React, { useState } from "react";
import PARAGRAPHS from "./prepositionHuntData";
import PrepositionHuntParagraph from "./PrepositionHuntParagraph";
import PrepositionHuntPopup from "./PrepositionHuntPopup";
import PrepositionHuntResults from "./PrepositionHuntResults";

const PrepositionHuntGame = () => {
  const [paragraphIndex, setParagraphIndex] = useState(0);
  const [tokenStates, setTokenStates] = useState({});
  const [popup, setPopup] = useState(null);
  const [score, setScore] = useState(0);
  const [wrongClicks, setWrongClicks] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [missed, setMissed] = useState([]);

  const paragraph = PARAGRAPHS[paragraphIndex];
  const totalItems = paragraph.tokens.filter((t) => t.isPrep).length;
  const correctCount = Object.values(tokenStates).filter((s) => s === "correct").length;

  const handleTokenClick = (token, index, e) => {
    if (tokenStates[index]) return;
    if (token.word === "." || token.word === "," || token.word === "!") return;
    if (!token.isPrep) {
      setWrongClicks((prev) => prev + 1);
      setTokenStates((prev) => ({ ...prev, [index]: "wrong-click" }));
      setTimeout(() => { setTokenStates((prev) => { const next = { ...prev }; delete next[index]; return next; }); }, 600);
      return;
    }
    const rect = e.target.getBoundingClientRect();
    setPopup({ tokenIndex: index, position: { x: rect.left, y: rect.bottom } });
  };

  const handleAnswer = (choice) => {
    const { tokenIndex } = popup;
    const token = paragraph.tokens[tokenIndex];
    const isCorrect = choice === token.type;
    const newStates = { ...tokenStates, [tokenIndex]: isCorrect ? "correct" : "wrong-type" };
    setTokenStates(newStates);
    if (isCorrect) setScore((prev) => prev + 1);
    setPopup(null);
    const answered = Object.keys(newStates).filter((k) => paragraph.tokens[k]?.isPrep).length;
    if (answered === totalItems) {
      const missedList = paragraph.tokens.filter((t, i) => t.isPrep && newStates[i] !== "correct").map((t) => ({ word: t.word, type: t.type }));
      setTimeout(() => { setMissed(missedList); setGameOver(true); }, 400);
    }
  };

  const handleReplay = () => {
    setTokenStates({}); setPopup(null); setScore(0); setWrongClicks(0);
    setGameOver(false); setMissed([]);
    setParagraphIndex((paragraphIndex + 1) % PARAGRAPHS.length);
  };

  if (gameOver) {
    return (
      <div style={{ fontFamily: "'Inter', sans-serif" }}>
        <PrepositionHuntResults score={score} total={totalItems} missed={missed} onReplay={handleReplay} />
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>
      <div style={{ background: "white", border: "1px solid #e5e7eb", borderRadius: "14px", padding: "16px 20px", marginBottom: "16px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
          <span style={{ fontWeight: "700", fontSize: "0.9rem", color: "#1f2937" }}>Prepositions Found</span>
          <span style={{ fontWeight: "700", fontSize: "0.9rem", color: "#1f2937" }}>{correctCount} / {totalItems}</span>
        </div>
        <div style={{ background: "#e5e7eb", borderRadius: "999px", height: "8px" }}>
          <div style={{ background: "#22d3ee", height: "100%", borderRadius: "999px", width: `${(correctCount / totalItems) * 100}%`, transition: "width 0.3s ease" }} />
        </div>
      </div>
      <div style={{ background: "white", border: "1px solid #e5e7eb", borderRadius: "16px", padding: "24px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
        
        <div style={{ background: "#ecfeff", border: "1px solid #a5f3fc", borderRadius: "10px", padding: "10px 14px", marginBottom: "20px" }}>
          <p style={{ margin: 0, fontSize: "0.85rem", fontWeight: "600", color: "#0e7490" }}>
            📖 Find every preposition in the sentence, then identify its type!
          </p>
        </div>
        
        <PrepositionHuntParagraph tokens={paragraph.tokens} tokenStates={tokenStates} onTokenClick={handleTokenClick} />
        {wrongClicks > 0 && (
          <p style={{ marginTop: "12px", fontSize: "0.8rem", fontWeight: "600", color: "#dc2626", textAlign: "right" }}>
            ❌ {wrongClicks} wrong click{wrongClicks > 1 ? "s" : ""}
          </p>
        )}
        <p style={{ marginTop: "14px", fontSize: "0.75rem", fontWeight: "600", color: "#9ca3af", textAlign: "center" }}>
          Paragraph {paragraphIndex + 1} of {PARAGRAPHS.length}
        </p>
      </div>
      {popup && (
        <PrepositionHuntPopup token={paragraph.tokens[popup.tokenIndex]} onAnswer={handleAnswer} onClose={() => setPopup(null)} position={popup.position} />
      )}
    </div>
  );
};

export default PrepositionHuntGame;
