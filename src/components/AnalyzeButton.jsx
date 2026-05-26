export default function AnalyzeButton({ loading, disabled, onClick }) {
  return (
    <button
      onClick={onClick}
      disabled={loading || disabled}
      style={{
        background: loading ? "#111" : "linear-gradient(135deg,#3a3aff,#6b3aff)",
        border: "none", borderRadius: 10, padding: "16px", color: "#fff",
        fontSize: 13, fontFamily: "inherit", letterSpacing: "0.15em", fontWeight: 500,
        boxShadow: loading ? "none" : "0 0 20px #3a3aff55",
        cursor: loading || disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.4 : 1, transition: "all 0.2s", width: "100%",
      }}
    >
      {loading ? <span style={{ animation: "pulse 1s infinite", display: "inline-block" }}>◉ ANALYZING...</span> : "◉ ANALYZE IMAGE"}
    </button>
  );
}