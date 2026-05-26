import { useState } from "react";

export function useVisionAnalysis() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  const analyze = async ({ imageBase64, imageMime, prompt, mode, image, onError }) => {
    if (!imageBase64) { onError("Please upload an image first."); return; }
    if (!prompt?.trim()) { onError("Please enter a custom query."); return; }

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`
        },
        body: JSON.stringify({
          model: "meta-llama/llama-4-scout-17b-16e-instruct",
          max_tokens: 1000,
          messages: [
            {
              role: "user",
              content: [
                {
                  type: "image_url",
                  image_url: {
                    url: `data:${imageMime};base64,${imageBase64}`
                  }
                },
                {
                  type: "text",
                  text: prompt
                }
              ]
            }
          ]
        })
      });

      const data = await response.json();
      if (data.error) throw new Error(data.error.message);

      const text = data.choices?.[0]?.message?.content || "No response.";
      setResult(text);
      setHistory(h => [
        { mode: mode.label, result: text, image, time: new Date().toLocaleTimeString() },
        ...h.slice(0, 4)
      ]);
    } catch (err) {
      onError(err.message || "Analysis failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return { result, loading, history, analyze, setResult };
}