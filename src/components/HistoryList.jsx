export default function HistoryList({ history, onSelect }) {
  if (!history.length) return null;
  return (
    <div style={{ background: "#0e0e1a", border: "1px solid #1a1a2e", borderRadius: 12, overflow: "hidden" }}>
      <div style={{ padding: "14px 18px", borderBottom: "1px solid #1a1a2e", fontSize: 10, letterSpacing: "0.12em", color: "#444" }}>RECENT ANALYSES</div>
      <div style={{ maxHeight: 220, overflowY: "auto" }}>
        {history.map((h, i) => (
          <div key={i} onClick={() => onSelect(h.result)}
            style={{ padding: "12px 18px", borderBottom: i < history.length - 1 ? "1px solid #111" : "none", display: "flex", gap: 12, cursor: "pointer" }}>
            <img src={h.image} alt="" style={{ width: 40, height: 40, borderRadius: 6, objectFit: "cover", opacity: 0.7 }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                <span style={{ fontSize: 10, color: "#3a3aff", letterSpacing: "0.08em" }}>{h.mode.toUpperCase()}</span>
                <span style={{ fontSize: 10, color: "#333" }}>{h.time}</span>
              </div>
              <div style={{ fontSize: 11, color: "#555", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{h.result}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}