import React from "react";

const NounHuntResults = ({ score, total, missed, onReplay }) => {
  const pct = Math.round((score / total) * 100);
  const emoji = pct === 100 ? "🏆" : pct >= 70 ? "🎉" : pct >= 40 ? "👍" : "📖";
  const msg =
    pct === 100 ? "Perfect! You found every noun!" :
    pct >= 70   ? "Great work! Almost there." :
    pct >= 40   ? "Good effort — keep practicing!" :
                  "Keep reviewing noun types and try again!";

  return (
    <div style={{ textAlign: "center", padding: "32px 20px", maxWidth: "480px", margin: "0 auto" }}>
      <div style={{ fontSize: "4rem", marginBottom: "12px" }}>{emoji}</div>

      {/* This is to show score card */}
      <div style={{
        background: "white",
        border: "3px solid #1a1a2e",
        borderRadius: "20px",
        padding: "24px",
        boxShadow: "5px 5px 0px #1a1a2e",
        marginBottom: "24px",
      }}>
        <h2 style={{ fontSize: "2rem", fontWeight: "900", color: "#1a1a2e", margin: "0 0 6px 0" }}>
          {score} / {total}
        </h2>
        <p style={{ color: "#555", margin: 0, fontSize: "1rem", fontWeight: "600" }}>{msg}</p>
      </div>

      {/* Missed nouns */}
      {missed.length > 0 && (
        <div style={{
          background: "white",
          border: "3px solid #1a1a2e",
          borderRadius: "16px",
          padding: "16px 20px",
          marginBottom: "24px",
          textAlign: "left",
          boxShadow: "4px 4px 0px #1a1a2e",
        }}>
          <p style={{
            margin: "0 0 10px 0",
            fontWeight: "900",
            color: "#e85d04",
            fontSize: "0.85rem",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
          }}>
            Missed Nouns
          </p>
          {missed.map((m, i) => (
            <div key={i} style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "6px 0",
              borderBottom: i < missed.length - 1 ? "1px solid #e5e7eb" : "none",
              fontSize: "0.95rem",
            }}>
              <strong style={{ color: "#1a1a2e" }}>{m.word}</strong>
              <span style={{
                background: "#00e5cc",
                border: "2px solid #1a1a2e",
                borderRadius: "6px",
                padding: "1px 8px",
                fontSize: "0.8rem",
                fontWeight: "800",
                color: "#1a1a2e",
              }}>
                {m.type}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Play Again button */}
      <button
        onClick={onReplay}
        style={{
          padding: "14px 36px",
          background: "#ffe600",
          border: "3px solid #1a1a2e",
          borderRadius: "12px",
          fontSize: "1rem",
          fontWeight: "900",
          color: "#1a1a2e",
          cursor: "pointer",
          boxShadow: "4px 4px 0px #1a1a2e",
          transition: "transform 0.1s, box-shadow 0.1s",
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = "translate(-2px,-2px)";
          e.currentTarget.style.boxShadow = "6px 6px 0px #1a1a2e";
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = "translate(0,0)";
          e.currentTarget.style.boxShadow = "4px 4px 0px #1a1a2e";
        }}
      >
        Play Again
      </button>
    </div>
  );
};

export default NounHuntResults;
