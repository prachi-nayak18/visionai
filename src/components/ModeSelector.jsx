import React from "react";

export default function ModeSelector({ modes, selected, onSelect }) {
  return (
    <div>
      <div style={{
        fontSize: 10, color: "#888",
        letterSpacing: "0.12em", marginBottom: 10
      }}>
        ANALYSIS MODE
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
        {modes.map(m => (
          <button key={m.id} onClick={() => onSelect(m)}
            style={{
              background: selected.id === m.id ? "#3a3aff" : "#ffffff",
              border: `1px solid ${selected.id === m.id ? "#3a3aff" : "#dddddd"}`,
              borderRadius: 8, padding: "10px 8px",
              color: selected.id === m.id ? "#ffffff" : "#333333",
              fontSize: 11, fontFamily: "inherit",
              textAlign: "center", letterSpacing: "0.05em",
              cursor: "pointer", transition: "all 0.2s",
              boxShadow: "0 2px 8px #0000000a"
            }}>
            <div style={{ fontSize: 18, marginBottom: 4 }}>{m.icon}</div>
            {m.label.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
}
