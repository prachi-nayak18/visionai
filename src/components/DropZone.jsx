import React from "react";

export default function DropZone({ image, dragOver, setDragOver, loading, onDrop, onClick, onClear }) {
  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
      onDragLeave={() => setDragOver(false)}
      onDrop={onDrop}
      onClick={() => !image && onClick()}
      style={{
        border: `1px dashed ${dragOver ? "#3a3aff" : image ? "#3a3aff55" : "#cccccc"}`,
        borderRadius: 12,
        background: dragOver ? "#e8e8ff" : "#ffffff",
        minHeight: 280,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        cursor: image ? "default" : "pointer",
        position: "relative", overflow: "hidden",
        transition: "all 0.3s",
        boxShadow: "0 2px 12px #0000000f"
      }}
    >
      {loading && (
        <div style={{
          position: "absolute", left: 0, right: 0, height: 2,
          background: "linear-gradient(90deg,transparent,#3a3aff,transparent)",
          animation: "scan 2s linear infinite"
        }} />
      )}
      {image ? (
        <>
          <img src={image} alt="uploaded" style={{
            maxWidth: "100%", maxHeight: 300,
            borderRadius: 8, display: "block"
          }} />
          <button
            onClick={(e) => { e.stopPropagation(); onClear(); }}
            style={{
              position: "absolute", top: 10, right: 10,
              background: "#ff3a3a22", border: "1px solid #ff3a3a55",
              color: "#ff3a3a", borderRadius: 6,
              padding: "4px 10px", fontSize: 11,
              cursor: "pointer", fontFamily: "inherit"
            }}>
            ✕ CLEAR
          </button>
        </>
      ) : (
        <div style={{ textAlign: "center", padding: 32 }}>
          <div style={{ fontSize: 40, marginBottom: 16, opacity: 0.2, color: "#333" }}>⬡</div>
          <div style={{ fontSize: 13, color: "#888", marginBottom: 6 }}>DROP IMAGE HERE</div>
          <div style={{ fontSize: 11, color: "#aaa", letterSpacing: "0.08em" }}>
            or click to browse · paste from clipboard
          </div>
          <div style={{ marginTop: 16, fontSize: 10, color: "#ccc", letterSpacing: "0.1em" }}>
            JPG · PNG · WEBP · GIF
          </div>
        </div>
      )}
    </div>
  );
}