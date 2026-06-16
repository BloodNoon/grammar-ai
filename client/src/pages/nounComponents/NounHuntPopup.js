import React, { useMemo } from "react";
import { createPortal } from "react-dom";

// Shuffle an array using Fisher-Yates algorithm
const shuffleArray = (arr) => {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const NounHuntPopup = ({ token, onAnswer, onClose, position }) => {
  // Shuffle choices once when the popup opens
  const shuffledChoices = useMemo(() => shuffleArray(token.choices), [token]);

  const popupContent = (
    <>
      {/* Backdrop — clicking outside closes the popup */}
      <div
        onClick={onClose}
        style={{ position: "fixed", inset: 0, zIndex: 9998 }}
      />

      {/* Popup card */}
      <div style={{
        position: "fixed",
        top: Math.min(position.y + 10, window.innerHeight - 220),
        left: Math.min(Math.max(position.x - 100, 10), window.innerWidth - 260),
        zIndex: 9999,
        background: "white",
        border: "3px solid #1a1a2e",
        borderRadius: "16px",
        padding: "16px",
        boxShadow: "4px 4px 0px #1a1a2e",
        minWidth: "230px",
      }}>
        <p style={{
          margin: "0 0 6px 0",
          fontSize: "0.8rem",
          fontWeight: "800",
          color: "#e85d04",
          textTransform: "uppercase",
          letterSpacing: "0.06em",
        }}>
          What type of noun?
        </p>

        <p style={{
          margin: "0 0 14px 0",
          fontSize: "1.3rem",
          fontWeight: "900",
          color: "#1a1a2e",
        }}>
          "{token.word}"
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {shuffledChoices.map((choice) => (
            <button
              key={choice}
              onClick={() => onAnswer(choice)}
              style={{
                padding: "10px 14px",
                background: "#ffe600",
                border: "2.5px solid #1a1a2e",
                borderRadius: "10px",
                cursor: "pointer",
                fontSize: "0.95rem",
                fontWeight: "800",
                color: "#1a1a2e",
                textAlign: "left",
                boxShadow: "2px 2px 0px #1a1a2e",
                transition: "transform 0.1s, box-shadow 0.1s",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "translate(-1px,-1px)";
                e.currentTarget.style.boxShadow = "3px 3px 0px #1a1a2e";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "translate(0,0)";
                e.currentTarget.style.boxShadow = "2px 2px 0px #1a1a2e";
              }}
            >
              {choice}
            </button>
          ))}
        </div>
      </div>
    </>
  );

  return createPortal(popupContent, document.body);
};

export default NounHuntPopup;
