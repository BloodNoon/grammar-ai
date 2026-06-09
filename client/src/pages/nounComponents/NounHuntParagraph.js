import React from "react";

// Returns the inline style for each word token based on its state
const getTokenStyle = (token, state) => {
  const isPunct = token.word === "." || token.word === "," || token.word === "!";

  const base = {
    display: "inline-block",
    padding: isPunct ? "0 1px" : "4px 9px",
    margin: isPunct ? "0" : "3px 3px",
    borderRadius: "8px",
    fontSize: "1.1rem",
    fontWeight: token.isNoun ? "800" : "500",
    cursor: isPunct || state ? "default" : "pointer",
    transition: "all 0.15s",
    userSelect: "none",
    border: "2.5px solid transparent",
  };

  if (state === "correct")     return { ...base, background: "#d1fae5", color: "#065f46", border: "2.5px solid #059669", boxShadow: "2px 2px 0px #065f46" };
  if (state === "wrong-type")  return { ...base, background: "#fee2e2", color: "#991b1b", border: "2.5px solid #dc2626", boxShadow: "2px 2px 0px #991b1b" };
  if (state === "wrong-click") return { ...base, background: "#fee2e2", color: "#991b1b", border: "2.5px solid #dc2626" };
  if (token.isNoun)            return { ...base, background: "#ffe600", color: "#1a1a2e", border: "2.5px solid #1a1a2e", boxShadow: "2px 2px 0px #1a1a2e" };
  return { ...base, color: "#1a1a2e" };
};

const NounHuntParagraph = ({ tokens, tokenStates, onTokenClick }) => (
  <div style={{
    background: "#fafafa",
    border: "2.5px dashed #1a1a2e",
    borderRadius: "14px",
    padding: "20px",
    lineHeight: "2.4",
    minHeight: "80px",
  }}>
    {tokens.map((token, index) => (
      <span
        key={index}
        style={getTokenStyle(token, tokenStates[index])}
        onClick={(e) => onTokenClick(token, index, e)}
      >
        {token.word}
      </span>
    ))}
  </div>
);

export default NounHuntParagraph;
