import React from "react";

const ArticleHuntResults = ({ score, total, missed, onReplay }) => {
  const pct = Math.round((score / total) * 100);
  const emoji = pct === 100 ? "🏆" : pct >= 70 ? "🎉" : pct >= 40 ? "👍" : "📖";
  const msg =
    pct === 100 ? "Perfect! You found every article!" :
    pct >= 70   ? "Great work! Almost there." :
    pct >= 40   ? "Good effort — keep practicing!" :
                  "Keep reviewing article types and try again!";

  return (
    <div style={{ textAlign: "center", padding: "32px 20px", maxWidth: "480px", margin: "0 auto" }}>
      <div style={{ fontSize: "3.5rem", marginBottom: "12px" }}>{emoji}</div>
      <div style={{ background: "white", border: "1px solid #e5e7eb", borderRadius: "16px", padding: "24px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", marginBottom: "24px" }}>
        <h2 style={{ fontSize: "1.8rem", fontWeight: "800", color: "#1e1b4b", margin: "0 0 6px 0" }}>{score} / {total}</h2>
        <p style={{ color: "#6b7280", margin: 0, fontSize: "1rem" }}>{msg}</p>
      </div>
      {missed.length > 0 && (
        <div style={{ background: "white", border: "1px solid #e5e7eb", borderRadius: "14px", padding: "16px 20px", marginBottom: "24px", textAlign: "left", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
          <p style={{ margin: "0 0 10px 0", fontWeight: "700", color: "#ea580c", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>Missed Articles</p>
          {missed.map((m, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: i < missed.length - 1 ? "1px solid #f3f4f6" : "none", fontSize: "0.9rem" }}>
              <strong style={{ color: "#1f2937" }}>{m.word}</strong>
              <span style={{ background: "#cffafe", border: "1px solid #67e8f9", borderRadius: "6px", padding: "1px 8px", fontSize: "0.75rem", fontWeight: "700", color: "#0e7490" }}>{m.type}</span>
            </div>
          ))}
        </div>
      )}
      <button
        onClick={onReplay}
        style={{ padding: "12px 32px", background: "#fde047", color: "#1f2937", border: "1.5px solid #facc15", borderRadius: "10px", fontSize: "0.95rem", fontWeight: "700", cursor: "pointer", boxShadow: "0 2px 6px rgba(0,0,0,0.08)", transition: "transform 0.1s" }}
        onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1px)"; }}
        onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; }}
      >
        Play Again
      </button>
    </div>
  );
};

export default ArticleHuntResults;
