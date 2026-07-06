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
    if (getCurrentChapter() !== "chapter-05.md") {
      return;
    }

    const rect = canvas.getBoundingClientRect();
    setPointer({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
    renderCanvasExample("chapter-05.md");
  });

  canvas.addEventListener("pointerleave", () => {
    if (getCurrentChapter() !== "chapter-05.md") {
      return;
    }

    setPointer(null);
    renderCanvasExample("chapter-05.md");
  });
}
