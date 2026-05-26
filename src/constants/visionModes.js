export const VISION_MODES = [
  {
    id: "describe",
    label: "Describe",
    icon: "◉",
    prompt: "Describe this image in detail. Include objects, colors, composition, mood, and any text visible."
  },
  {
    id: "detect",
    label: "Detect Objects",
    icon: "⬡",
    prompt: "List all objects you can detect in this image. For each object, mention its location and approximate size. Format as a structured list."
  },
  {
    id: "ocr",
    label: "Read Text",
    icon: "Ꭲ",
    prompt: "Extract all text visible in this image. Preserve formatting where possible. If no text, say so."
  },
  {
    id: "analyze",
    label: "Analyze Scene",
    icon: "◈",
    prompt: "Analyze the scene: What is happening? Who/what is in it? What is the context or setting? What emotions or story does it convey?"
  },
  {
    id: "colors",
    label: "Color Palette",
    icon: "▣",
    prompt: "Analyze the color palette of this image. List the dominant colors with approximate hex values, and describe the overall color mood/theme."
  },
  {
    id: "custom",
    label: "Custom Query",
    icon: "✦",
    prompt: null
  },
];