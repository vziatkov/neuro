export function registerLabInteractions({
  canvas,
  candlesDataInput,
  getCurrentChapter,
  parseCandlesInput,
  renderCanvasExample,
  setCandles,
  setCandlesStatus,
  setPointer,
}) {
  const pointerChapters = new Set(["chapter-05.md", "chapter-08.md"]);

  candlesDataInput.addEventListener("input", () => {
    try {
      const candles = parseCandlesInput();
      setCandles(candles);
      setCandlesStatus(`OK: ${candles.length} candles`);
      renderCanvasExample(getCurrentChapter() || "chapter-03.md");
    } catch (error) {
      setCandlesStatus(error.message, true);
    }
  });

  canvas.addEventListener("pointermove", (event) => {
    const currentChapter = getCurrentChapter();
    if (!pointerChapters.has(currentChapter)) {
      return;
    }

    const rect = canvas.getBoundingClientRect();
    setPointer({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
    renderCanvasExample(currentChapter);
  });

  canvas.addEventListener("pointerleave", () => {
    const currentChapter = getCurrentChapter();
    if (!pointerChapters.has(currentChapter)) {
      return;
    }

    setPointer(null);
    renderCanvasExample(currentChapter);
  });
}
