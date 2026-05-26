import React, { useState } from "react";
import { VISION_MODES } from "./constants/visionModes";
import { useImageUpload } from "./hooks/useImageUpload";
import { useVisionAnalysis } from "./hooks/useVisionAnalysis";
import Header from "./components/Header";
import DropZone from "./components/DropZone";
import ModeSelector from "./components/ModeSelector";
import ResultBox from "./components/ResultBox";

export default function App() {
  const [mode, setMode] = useState(VISION_MODES[0]);
  const [customPrompt, setCustomPrompt] = useState("");
  const [error, setError] = useState(null);

  const {
    image, imageBase64, imageMime,
    dragOver, setDragOver,
    fileRef, processFile,
    handleDrop, handlePaste, clearImage
  } = useImageUpload();

  const { result, loading, history, analyze, setResult } = useVisionAnalysis();

  const handleAnalyze = () => {
    setError(null);
    const prompt = mode.id === "custom" ? customPrompt : mode.prompt;
    analyze({ imageBase64, imageMime, prompt, mode, image, onError: setError });
  };

  return (
    <div onPaste={handlePaste} style={{
      minHeight: "100vh", background: "#f5f5f5",
      fontFamily: "'DM Mono', monospace",
      color: "#111111", display: "flex", flexDirection: "column"
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Syne:wght@700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        @keyframes scan { 0%{top:0%} 100%{top:100%} }
        @keyframes fadeIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
      `}</style>

      <Header />

      <main style={{
        flex: 1, display: "grid",
        gridTemplateColumns: "1fr 1fr", gap: 24,
        maxWidth: 1200, margin: "0 auto",
        width: "100%", padding: "32px 24px"
      }}>
        {/* LEFT */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <DropZone
            image={image} dragOver={dragOver}
            setDragOver={setDragOver} loading={loading}
            onDrop={handleDrop}
            onClick={() => fileRef.current?.click()}
            onClear={() => { clearImage(); setResult(null); }}
          />
          <input ref={fileRef} type="file" accept="image/*"
            style={{ display: "none" }}
            onChange={e => processFile(e.target.files[0])}
          />

          <ModeSelector modes={VISION_MODES} selected={mode} onSelect={setMode} />

          {mode.id === "custom" && (
            <textarea
              value={customPrompt}
              onChange={e => setCustomPrompt(e.target.value)}
              placeholder="Enter your custom question..."
              style={{
                background: "#ffffff", border: "1px solid #dddddd",
                borderRadius: 8, padding: 14, color: "#111111",
                fontSize: 12, fontFamily: "inherit",
                resize: "vertical", minHeight: 80, outline: "none"
              }}
            />
          )}

          <button
            onClick={handleAnalyze}
            disabled={loading || !imageBase64}
            style={{
              background: loading ? "#dddddd" : "linear-gradient(135deg,#3a3aff,#6b3aff)",
              border: "none", borderRadius: 10, padding: "16px", color: "#fff",
              fontSize: 13, fontFamily: "inherit", letterSpacing: "0.15em",
              boxShadow: loading ? "none" : "0 4px 20px #3a3aff44",
              cursor: loading || !imageBase64 ? "not-allowed" : "pointer",
              opacity: !imageBase64 ? 0.5 : 1, transition: "all 0.2s",
            }}>
            {loading
              ? <span style={{ animation: "pulse 1s infinite", display: "inline-block", color: "#888" }}>◉ ANALYZING...</span>
              : "◉ ANALYZE IMAGE"
            }
          </button>
          {error && (
            <div style={{
              background: "#fff0f0", border: "1px solid #ffcccc",
              borderRadius: 8, padding: "12px 16px",
              color: "#cc0000", fontSize: 12
            }}>⚠ {error}</div>
          )}
        </div>

        {/* RIGHT */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <ResultBox result={result} />

          {/* History */}
          {history.length > 0 && (
            <div style={{
              background: "#ffffff", border: "1px solid #e0e0e0",
              borderRadius: 12, overflow: "hidden",
              boxShadow: "0 2px 12px #0000000f"
            }}>
              <div style={{
                padding: "14px 18px", borderBottom: "1px solid #e0e0e0",
                fontSize: 10, letterSpacing: "0.12em", color: "#888"
              }}>RECENT ANALYSES</div>
              <div style={{ maxHeight: 220, overflowY: "auto" }}>
                {history.map((h, i) => (
                  <div key={i} onClick={() => setResult(h.result)}
                    style={{
                      padding: "12px 18px",
                      borderBottom: i < history.length - 1 ? "1px solid #f0f0f0" : "none",
                      display: "flex", gap: 12, cursor: "pointer"
                    }}>
                    <img src={h.image} alt="" style={{
                      width: 40, height: 40, borderRadius: 6,
                      objectFit: "cover", opacity: 0.8
                    }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                        <span style={{ fontSize: 10, color: "#3a3aff", letterSpacing: "0.08em" }}>
                          {h.mode.toUpperCase()}
                        </span>
                        <span style={{ fontSize: 10, color: "#aaa" }}>{h.time}</span>
                      </div>
                      <div style={{
                        fontSize: 11, color: "#888",
                        overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"
                      }}>{h.result}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
            {[
              { label: "ANALYSES", value: history.length },
              { label: "MODE", value: mode.icon },
              { label: "STATUS", value: loading ? "●" : image ? "◉" : "○" },
            ].map(s => (
              <div key={s.label} style={{
                background: "#ffffff", border: "1px solid #e0e0e0",
                borderRadius: 8, padding: 12, textAlign: "center",
                boxShadow: "0 2px 8px #0000000a"
              }}>
                <div style={{ fontSize: 20, color: "#3a3aff", marginBottom: 4 }}>{s.value}</div>
                <div style={{ fontSize: 9, color: "#aaa", letterSpacing: "0.12em" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer style={{
        borderTop: "1px solid #e0e0e0", padding: "14px 32px",
        display: "flex", justifyContent: "space-between",
        fontSize: 10, color: "#aaaaaa", letterSpacing: "0.08em",
        background: "#ffffff"
      }}>
        <span>VISIONAI · COMPUTER VISION PLATFORM</span>
        <span>LLAMA 4 · GROQ</span>
      </footer>
      </div>
  );
}