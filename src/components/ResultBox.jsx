import React from "react";

export default function ResultBox({ result }) {
  return (
    <div style={{
      flex: 1, background: "#ffffff",
      border: "1px solid #e0e0e0",
      borderRadius: 12, overflow: "hidden",
      boxShadow: "0 2px 12px #0000000f"
    }}>
      <div style={{
        padding: "14px 18px",
        borderBottom: "1px solid #e0e0e0",
        display: "flex", alignItems: "center",
        justifyContent: "space-between"
      }}>
        <div style={{
          fontSize: 10, letterSpacing: "0.12em", color: "#888"
        }}>
          ANALYSIS OUTPUT
        </div>
        {result && (
          <button onClick={() => navigator.clipboard.writeText(result)}
            style={{
              background: "none", border: "1px solid #dddddd",
              borderRadius: 4, padding: "3px 10px",
              color: "#888", fontSize: 10,
              cursor: "pointer", fontFamily: "inherit",
              letterSpacing: "0.08em"
            }}>
            COPY
          </button>
        )}
      </div>
      <div style={{
        padding: 20, minHeight: 240,
        maxHeight: 400, overflowY: "auto"
      }}>
        {result ? (
          <div style={{
            fontSize: 13, lineHeight: 1.8,
            color: "#000000", whiteSpace: "pre-wrap",
            letterSpacing: "0.01em",
            animation: "fadeIn 0.4s ease"
          }}>
            {result}
          </div>
        ) : (
          <div style={{
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            height: 200, color: "#cccccc", textAlign: "center"
          }}>
            <div style={{ fontSize: 36, marginBottom: 12 }}>◈</div>
            <div style={{ fontSize: 11, letterSpacing: "0.1em" }}>
              AWAITING ANALYSIS
            </div>
          </div>
        )}
      </div>
    </div>
  );
}