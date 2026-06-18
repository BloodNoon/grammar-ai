import React, { useMemo } from "react";
import { createPortal } from "react-dom";

const shuffleArray = (arr) => {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const POPUP_HEIGHT = 250;
const POPUP_WIDTH = 230;
const MARGIN = 12;

const VerbHuntPopup = ({ token, onAnswer, onClose, position }) => {
  const shuffledChoices = useMemo(() => shuffleArray(token.choices), [token]);

  const spaceBelow = window.innerHeight - position.y;
  const shouldFlipUp = spaceBelow < POPUP_HEIGHT + MARGIN;

  const top = shouldFlipUp
    ? Math.max(position.y - POPUP_HEIGHT - 10, MARGIN)
    : Math.min(position.y + 10, window.innerHeight - POPUP_HEIGHT - MARGIN);

  const left = Math.min(
    Math.max(position.x - POPUP_WIDTH / 2, MARGIN),
    window.innerWidth - POPUP_WIDTH - MARGIN
  );

  const popupContent = (
    <>
      <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 9998 }} />
      <div style={{
        position: "fixed", top, left, zIndex: 9999,
        background: "white", border: "1px solid #e5e7eb", borderRadius: "14px",
        padding: "16px", boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
        width: `${POPUP_WIDTH}px`, maxHeight: `calc(100vh - ${MARGIN * 2}px)`, overflowY: "auto",
      }}>
        <p style={{ margin: "0 0 6px 0", fontSize: "0.75rem", fontWeight: "700", color: "#ea580c", textTransform: "uppercase", letterSpacing: "0.05em" }}>
          What type of verb?
        </p>
        <p style={{ margin: "0 0 14px 0", fontSize: "1.2rem", fontWeight: "800", color: "#1f2937" }}>"{token.word}"</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {shuffledChoices.map((choice) => (
            <button
              key={choice}
              onClick={() => onAnswer(choice)}
              style={{ padding: "9px 14px", background: "#fef9c3", border: "1.5px solid #fde047", borderRadius: "9px", cursor: "pointer", fontSize: "0.9rem", fontWeight: "700", color: "#1f2937", textAlign: "left", transition: "background 0.15s" }}
              onMouseEnter={e => { e.currentTarget.style.background = "#fef08a"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "#fef9c3"; }}
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

export default VerbHuntPopup;
