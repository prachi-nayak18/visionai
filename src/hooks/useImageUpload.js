import { useState, useRef, useCallback } from "react";

export function useImageUpload() {
  const [image, setImage] = useState(null);
  const [imageBase64, setImageBase64] = useState(null);
  const [imageMime, setImageMime] = useState("image/jpeg");
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef();

  const processFile = useCallback((file) => {
    if (!file || !file.type.startsWith("image/")) return;
    setImageMime(file.type);
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target.result;
      setImage(dataUrl);
      setImageBase64(dataUrl.split(",")[1]);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragOver(false);
    processFile(e.dataTransfer.files[0]);
  }, [processFile]);

  const handlePaste = useCallback((e) => {
    const item = [...(e.clipboardData?.items || [])].find(i => i.type.startsWith("image/"));
    if (item) processFile(item.getAsFile());
  }, [processFile]);

  const clearImage = () => {
    setImage(null);
    setImageBase64(null);
  };

  return {
    image, imageBase64, imageMime,
    dragOver, setDragOver,
    fileRef, processFile,
    handleDrop, handlePaste, clearImage
  };
}