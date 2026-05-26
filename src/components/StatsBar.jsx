export default function StatsBar({ count, modeIcon, loading, hasImage }) {
  const status = loading ? "●" : hasImage ? "◉" : "○";
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
      {[{ label: "ANALYSES", value: count }, { label: "MODE", value: modeIcon }, { label: "STATUS", value: status }].map(s => (
        <div key={s.label} style={{ background: "#0e0e1a", border: "1px solid #1a1a2e", borderRadius: 8, padding: 12, textAlign: "center" }}>
          <div style={{ fontSize: 20, color: "#3a3aff", marginBottom: 4 }}>{s.value}</div>
          <div style={{ fontSize: 9, color: "#333", letterSpacing: "0.12em" }}>{s.label}</div>
        </div>
      ))}
    </div>
  );
}
