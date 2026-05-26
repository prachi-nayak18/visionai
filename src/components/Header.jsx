import React from "react";

export default function Header() {
  return (
    <header style={{
      padding: "20px 32px",
      borderBottom: "1px solid #e0e0e0",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      background: "#ffffff"
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{
          width: 36, height: 36,
          background: "linear-gradient(135deg,#3a3aff,#9b5de5)",
          borderRadius: 8,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 18
        }}>◉</div>
        <div>
          <div style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: 18, fontWeight: 800,
            letterSpacing: "-0.02em", color: "#111"
          }}>
            VISION<span style={{ color: "#3a3aff" }}>AI</span>
          </div>
          <div style={{ fontSize: 10, color: "#888", letterSpacing: "0.12em" }}>
            COMPUTER VISION · POWERED BY GROQ
          </div>
        </div>
      </div>
      <div style={{
        fontSize: 11, color: "#3a3aff",
        letterSpacing: "0.1em",
        display: "flex", alignItems: "center", gap: 6
      }}>
        <div style={{
          width: 6, height: 6, borderRadius: "50%",
          background: "#3a3aff",
          animation: "pulse 2s infinite"
        }} />
        LIVE
      </div>
    </header>
  );
}