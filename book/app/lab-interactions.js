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

  function updateCanvasPointer(event) {
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
  }

  function clearCanvasPointer() {
    const currentChapter = getCurrentChapter();
    if (!pointerChapters.has(currentChapter)) {
      return;
    }

    setPointer(null);
    renderCanvasExample(currentChapter);
  }

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

  canvas.addEventListener("pointerdown", (event) => {
    if (!pointerChapters.has(getCurrentChapter())) {
      return;
    }

    event.preventDefault();
    canvas.setPointerCapture?.(event.pointerId);
    updateCanvasPointer(event);
  });

  canvas.addEventListener("pointermove", (event) => {
    if (!pointerChapters.has(getCurrentChapter())) {
      return;
    }

    event.preventDefault();
    updateCanvasPointer(event);
  });

  canvas.addEventListener("pointerup", (event) => {
    canvas.releasePointerCapture?.(event.pointerId);
  });

  canvas.addEventListener("pointercancel", clearCanvasPointer);
  canvas.addEventListener("pointerleave", clearCanvasPointer);

  ["dragstart", "selectstart", "contextmenu"].forEach((eventName) => {
    canvas.addEventListener(eventName, (event) => {
      event.preventDefault();
    });
  });
}
