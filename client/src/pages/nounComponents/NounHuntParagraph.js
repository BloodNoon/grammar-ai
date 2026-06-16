import React from "react";

const getTokenStyle = (token, state) => {
  const isPunct = token.word === "." || token.word === "," || token.word === "!";

  const base = {
    display: "inline-block",
    padding: isPunct ? "0 1px" : "4px 9px",
    margin: isPunct ? "0" : "3px 3px",
    borderRadius: "8px",
    fontSize: "1.1rem",
    fontWeight: token.isNoun ? "700" : "500",
    cursor: isPunct || state ? "default" : "pointer",
    transition: "all 0.15s",
    userSelect: "none",
    border: "1.5px solid transparent",
  };

  if (state === "correct")     return { ...base, background: "#dcfce7", color: "#166534", border: "1.5px solid #86efac" };
  if (state === "wrong-type")  return { ...base, background: "#fee2e2", color: "#991b1b", border: "1.5px solid #fca5a5" };
  if (state === "wrong-click") return { ...base, background: "#fee2e2", color: "#991b1b", border: "1.5px solid #fca5a5" };
  if (token.isNoun)            return { ...base, background: "#fef9c3", color: "#854d0e", border: "1.5px solid #fde047" };
  return { ...base, color: "#374151" };
};

const NounHuntParagraph = ({ tokens, tokenStates, onTokenClick }) => (
  <div style={{ background: "#f9fafb", border: "1.5px dashed #d1d5db", borderRadius: "12px", padding: "20px", lineHeight: "2.4", minHeight: "80px" }}>
    {tokens.map((token, index) => (
      <span key={index} style={getTokenStyle(token, tokenStates[index])} onClick={(e) => onTokenClick(token, index, e)}>
        {token.word}
      </span>
    ))}
  </div>
);

export default NounHuntParagraph;
