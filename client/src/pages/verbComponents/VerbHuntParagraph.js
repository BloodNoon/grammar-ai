import React from "react";


const getTokenStyle = (token, state) => {
  const isPunct = token.word === "." || token.word === "," || token.word === "!";

  const base = {
    display: "inline-block",
    padding: isPunct ? "0 1px" : "4px 9px",
    margin: isPunct ? "0" : "3px 3px",
    borderRadius: "8px",
    fontSize: "1.1rem",
    fontWeight: "500",
    cursor: isPunct || state ? "default" : "pointer",
    transition: "all 0.15s",
    userSelect: "none",
    border: "1.5px solid transparent",
    color: "#374151",
  };

  if (state === "correct")     return { ...base, background: "#dcfce7", color: "#166534", border: "1.5px solid #86efac", fontWeight: "700" };
  if (state === "wrong-type")  return { ...base, background: "#fee2e2", color: "#991b1b", border: "1.5px solid #fca5a5", fontWeight: "700" };
  if (state === "wrong-click") return { ...base, background: "#fee2e2", color: "#991b1b", border: "1.5px solid #fca5a5" };
  return base;
};

const VerbHuntParagraph = ({ tokens, tokenStates, onTokenClick }) => (
  <div style={{ background: "#f9fafb", border: "1.5px dashed #d1d5db", borderRadius: "12px", padding: "20px", lineHeight: "2.4", minHeight: "80px" }}>
    {tokens.map((token, index) => (
      <span key={index} style={getTokenStyle(token, tokenStates[index])} onClick={(e) => onTokenClick(token, index, e)}>
        {token.word}
      </span>
    ))}
  </div>
);

export default VerbHuntParagraph;
