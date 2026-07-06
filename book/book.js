import {
  clearCanvas,
  createInversePriceScale,
  createPriceScale,
  drawChartFrame,
  drawGrid,
  drawLabel,
  getChartArea,
  getPriceRange,
  setupCanvas,
} from "./graphics/core.js";
import { initBookViewer } from "./app/book-viewer.js";
import { registerLabInteractions } from "./app/lab-interactions.js";

const canvas = document.getElementById("chapter-canvas");
const canvasTitleEl = document.getElementById("canvas-example-title");
const candlesDataPanel = document.getElementById("candles-data-panel");
const candlesDataInput = document.getElementById("candles-data-input");
const candlesDataStatus = document.getElementById("candles-data-status");
console.log("redeploy");
const defaultCandles = [
  { open: 102, high: 109, low: 99, close: 107 },
  { open: 107, high: 111, low: 104, close: 105 },
  { open: 105, high: 114, low: 103, close: 112 },
  { open: 112, high: 116, low: 108, close: 110 },
  { open: 110, high: 118, low: 109, close: 117 },
  { open: 117, high: 121, low: 113, close: 115 },
  { open: 115, high: 119, low: 111, close: 112 },
  { open: 112, high: 116, low: 107, close: 109 },
  { open: 109, high: 113, low: 105, close: 111 },
  { open: 111, high: 120, low: 110, close: 119 },
  { open: 119, high: 124, low: 116, close: 122 },
  { open: 122, high: 126, low: 118, close: 120 },
];

let candles = structuredClone(defaultCandles);
let pointer = null;
let currentChapterFileName = "";

candlesDataInput.value = JSON.stringify(candles, null, 2);

function setCandlesPanelVisible(isVisible) {
  candlesDataPanel.hidden = !isVisible;
}

function setCandlesStatus(message, isError = false) {
  candlesDataStatus.textContent = message;
  candlesDataStatus.classList.toggle("error", isError);
}

function parseCandlesInput() {
  const nextCandles = JSON.parse(candlesDataInput.value);
  if (!Array.isArray(nextCandles)) {
    throw new Error("Expected an array of candles");
  }
  if (nextCandles.length === 0) {
    throw new Error("Expected at least one candle");
  }

  nextCandles.forEach((candle, index) => {
    for (const key of ["open", "high", "low", "close"]) {
      if (typeof candle?.[key] !== "number" || !Number.isFinite(candle[key])) {
        throw new Error(`Candle ${index + 1}: ${key} must be a number`);
      }
    }
  });

  return nextCandles;
}

function drawCoordinateExample(ctx, width, height) {
  clearCanvas(ctx, width, height);
  drawGrid(ctx, width, height);

  const origin = { x: width * 0.5, y: height * 0.58 };
  ctx.strokeStyle = "#f27d26";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(32, origin.y);
  ctx.lineTo(width - 32, origin.y);
  ctx.moveTo(origin.x, height - 28);
  ctx.lineTo(origin.x, 28);
  ctx.stroke();

  ctx.fillStyle = "#63ff9b";
  ctx.beginPath();
  ctx.arc(origin.x + 110, origin.y - 72, 6, 0, Math.PI * 2);
  ctx.fill();

  drawLabel(ctx, "screen y grows down", 34, 34, "#8f8075");
  drawLabel(ctx, "world point (x: 110, y: 72)", origin.x + 122, origin.y - 78, "#63ff9b");
}

function drawPrimitiveExample(ctx, width, height) {
  clearCanvas(ctx, width, height);
  drawGrid(ctx, width, height, 36);

  ctx.strokeStyle = "#63ff9b";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(width * 0.16, height * 0.72);
  ctx.lineTo(width * 0.42, height * 0.26);
  ctx.stroke();

  ctx.fillStyle = "rgba(242, 125, 38, 0.22)";
  ctx.strokeStyle = "#f27d26";
  ctx.lineWidth = 2;
  ctx.fillRect(width * 0.5, height * 0.32, width * 0.24, height * 0.28);
  ctx.strokeRect(width * 0.5, height * 0.32, width * 0.24, height * 0.28);

  ctx.fillStyle = "rgba(255, 220, 120, 0.2)";
  ctx.strokeStyle = "#ffd27a";
  ctx.beginPath();
  ctx.moveTo(width * 0.76, height * 0.72);
  ctx.lineTo(width * 0.86, height * 0.36);
  ctx.lineTo(width * 0.94, height * 0.72);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  drawLabel(ctx, "line", width * 0.16, height * 0.76, "#63ff9b");
  drawLabel(ctx, "rect", width * 0.5, height * 0.28, "#f27d26");
  drawLabel(ctx, "triangle", width * 0.8, height * 0.78, "#ffd27a");
}

function drawCandlesExample(ctx, width, height, candles) {
  clearCanvas(ctx, width, height);
  drawGrid(ctx, width, height, 38);

  const area = getChartArea(width, height);
  const { minPrice, maxPrice } = getPriceRange(candles);
  const priceToY = createPriceScale(minPrice, maxPrice, area);

  drawChartFrame(ctx, area);

  candles.forEach((candle, index) => {
    const slot = area.width / candles.length;
    const x = area.x + slot * index + slot * 0.5;
    const bodyWidth = Math.max(8, slot * 0.52);
    const up = candle.close >= candle.open;
    const color = up ? "#63ff9b" : "#ff5c5c";
    const yOpen = priceToY(candle.open);
    const yClose = priceToY(candle.close);
    const yHigh = priceToY(candle.high);
    const yLow = priceToY(candle.low);
    const bodyTop = Math.min(yOpen, yClose);
    const bodyHeight = Math.max(2, Math.abs(yClose - yOpen));

    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x, yHigh);
    ctx.lineTo(x, yLow);
    ctx.stroke();

    ctx.fillStyle = up ? "rgba(99, 255, 155, 0.24)" : "rgba(255, 92, 92, 0.24)";
    ctx.strokeStyle = color;
    ctx.fillRect(x - bodyWidth / 2, bodyTop, bodyWidth, bodyHeight);
    ctx.strokeRect(x - bodyWidth / 2, bodyTop, bodyWidth, bodyHeight);
  });

  drawLabel(ctx, `high ${maxPrice}`, area.x + area.width + 10, priceToY(maxPrice) + 4, "#8f8075");
  drawLabel(ctx, `low ${minPrice}`, area.x + area.width + 10, priceToY(minPrice), "#8f8075");
  drawLabel(ctx, "OHLC -> screen coordinates -> wick + body", area.x, height - 14, "#f5efe7");
}

function drawPriceScaleExample(ctx, width, height, candles) {
  clearCanvas(ctx, width, height);
  drawGrid(ctx, width, height, 38);

  const area = getChartArea(width, height, { right: 86 });
  const { minPrice, maxPrice } = getPriceRange(candles);
  const priceToY = createPriceScale(minPrice, maxPrice, area);
  const yToPrice = createInversePriceScale(minPrice, maxPrice, area);
  const ticks = 5;

  drawChartFrame(ctx, area);

  ctx.strokeStyle = "rgba(242, 125, 38, 0.35)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(area.x + area.width, area.y);
  ctx.lineTo(area.x + area.width, area.y + area.height);
  ctx.stroke();

  for (let index = 0; index <= ticks; index += 1) {
    const price = minPrice + ((maxPrice - minPrice) / ticks) * index;
    const y = priceToY(price);

    ctx.strokeStyle = "rgba(255, 255, 255, 0.11)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(area.x, y);
    ctx.lineTo(area.x + area.width, y);
    ctx.stroke();

    drawLabel(ctx, price.toFixed(2), area.x + area.width + 12, y + 4, "#f5efe7");
  }

  const sampleY = area.y + area.height * 0.38;
  const samplePrice = yToPrice(sampleY);
  ctx.strokeStyle = "#63ff9b";
  ctx.setLineDash([6, 6]);
  ctx.beginPath();
  ctx.moveTo(area.x, sampleY);
  ctx.lineTo(area.x + area.width, sampleY);
  ctx.stroke();
  ctx.setLineDash([]);

  drawLabel(ctx, `mouse y -> ${samplePrice.toFixed(2)}`, area.x + 12, sampleY - 10, "#63ff9b");
  drawLabel(ctx, "price axis is just an inverted linear scale", area.x, height - 14, "#f5efe7");
}

function drawCrosshairExample(ctx, width, height, candles) {
  drawCandlesExample(ctx, width, height, candles);

  if (!pointer) {
    drawLabel(ctx, "move mouse over the canvas", 58, 54, "#8f8075");
    return;
  }

  const area = getChartArea(width, height);
  const { minPrice, maxPrice } = getPriceRange(candles);
  const yToPrice = createInversePriceScale(minPrice, maxPrice, area);
  const slot = area.width / candles.length;
  const nearestIndex = Math.max(0, Math.min(candles.length - 1, Math.floor((pointer.x - area.x) / slot)));
  const nearestCandle = candles[nearestIndex];
  const candleX = area.x + slot * nearestIndex + slot * 0.5;
  const price = yToPrice(pointer.y);

  ctx.strokeStyle = "rgba(99, 255, 155, 0.78)";
  ctx.lineWidth = 1;
  ctx.setLineDash([5, 5]);
  ctx.beginPath();
  ctx.moveTo(candleX, area.y);
  ctx.lineTo(candleX, area.y + area.height);
  ctx.moveTo(area.x, pointer.y);
  ctx.lineTo(area.x + area.width, pointer.y);
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.fillStyle = "rgba(8, 6, 5, 0.86)";
  ctx.strokeStyle = "rgba(99, 255, 155, 0.45)";
  ctx.fillRect(area.x + 14, area.y + 14, 220, 86);
  ctx.strokeRect(area.x + 14, area.y + 14, 220, 86);

  drawLabel(ctx, `nearest candle: ${nearestIndex + 1}`, area.x + 28, area.y + 38, "#63ff9b");
  drawLabel(ctx, `O ${nearestCandle.open}  H ${nearestCandle.high}`, area.x + 28, area.y + 60, "#f5efe7");
  drawLabel(ctx, `L ${nearestCandle.low}  C ${nearestCandle.close}`, area.x + 28, area.y + 80, "#f5efe7");
  drawLabel(ctx, `y -> price ${price.toFixed(2)}`, area.x + 28, area.y + 100, "#8f8075");
}

function createManyCandles(count) {
  let price = 100;
  return Array.from({ length: count }, (_, index) => {
    const open = price;
    const close = open + Math.sin(index * 0.62) * 2.8 + Math.cos(index * 0.17) * 1.6;
    const high = Math.max(open, close) + 1.4 + (index % 5) * 0.24;
    const low = Math.min(open, close) - 1.2 - (index % 3) * 0.3;
    price = close;
    return {
      open: Number(open.toFixed(2)),
      high: Number(high.toFixed(2)),
      low: Number(low.toFixed(2)),
      close: Number(close.toFixed(2)),
    };
  });
}

function drawVisibleRangeExample(ctx, width, height) {
  clearCanvas(ctx, width, height);
  drawGrid(ctx, width, height, 38);

  const allCandles = createManyCandles(80);
  const visibleStart = 28;
  const visibleCount = 24;
  const visibleCandles = allCandles.slice(visibleStart, visibleStart + visibleCount);
  const area = getChartArea(width, height);
  const { minPrice, maxPrice } = getPriceRange(visibleCandles);
  const priceToY = createPriceScale(minPrice, maxPrice, area);

  drawChartFrame(ctx, area);

  visibleCandles.forEach((candle, index) => {
    const slot = area.width / visibleCandles.length;
    const x = area.x + slot * index + slot * 0.5;
    const bodyWidth = Math.max(5, slot * 0.45);
    const up = candle.close >= candle.open;
    const color = up ? "#63ff9b" : "#ff5c5c";
    const yOpen = priceToY(candle.open);
    const yClose = priceToY(candle.close);
    const yHigh = priceToY(candle.high);
    const yLow = priceToY(candle.low);
    const bodyTop = Math.min(yOpen, yClose);
    const bodyHeight = Math.max(2, Math.abs(yClose - yOpen));

    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x, yHigh);
    ctx.lineTo(x, yLow);
    ctx.stroke();

    ctx.fillStyle = up ? "rgba(99, 255, 155, 0.2)" : "rgba(255, 92, 92, 0.2)";
    ctx.strokeStyle = color;
    ctx.fillRect(x - bodyWidth / 2, bodyTop, bodyWidth, bodyHeight);
    ctx.strokeRect(x - bodyWidth / 2, bodyTop, bodyWidth, bodyHeight);
  });

  drawLabel(ctx, `dataset: ${allCandles.length} candles`, area.x, 36, "#8f8075");
  drawLabel(ctx, `rendered visible range: ${visibleStart + 1}-${visibleStart + visibleCount}`, area.x, 56, "#63ff9b");
  drawLabel(ctx, "real charts render the viewport, not the whole history", area.x, height - 14, "#f5efe7");
}

function renderCanvasExample(fileName) {
  const { ctx, width, height } = setupCanvas(canvas);
  currentChapterFileName = fileName;

  if (fileName === "chapter-06.md") {
    setCandlesPanelVisible(false);
    canvasTitleEl.textContent = "Exercise 06: Visible range";
    drawVisibleRangeExample(ctx, width, height);
    return;
  }

  if (fileName === "chapter-05.md") {
    setCandlesPanelVisible(true);
    canvasTitleEl.textContent = "Exercise 05: Crosshair + nearest candle";
    drawCrosshairExample(ctx, width, height, candles);
    return;
  }

  if (fileName === "chapter-04.md") {
    setCandlesPanelVisible(true);
    canvasTitleEl.textContent = "Exercise 04: Price scale";
    drawPriceScaleExample(ctx, width, height, candles);
    return;
  }

  if (fileName === "chapter-03.md") {
    setCandlesPanelVisible(true);
    canvasTitleEl.textContent = "Exercise 03: Candlestick chart";
    drawCandlesExample(ctx, width, height, candles);
    return;
  }

  setCandlesPanelVisible(false);

  if (fileName === "chapter-02.md") {
    canvasTitleEl.textContent = "Exercise 02: Lines, rects, triangles";
    drawPrimitiveExample(ctx, width, height);
    return;
  }

  if (fileName === "chapter-01.md") {
    canvasTitleEl.textContent = "Exercise 01: Coordinate system";
    drawCoordinateExample(ctx, width, height);
    return;
  }

  canvasTitleEl.textContent = "Deep notes";
  clearCanvas(ctx, width, height);
  drawLabel(ctx, "No canvas exercise for this note yet.", 28, 38, "#8f8075");
}

registerLabInteractions({
  canvas,
  candlesDataInput,
  getCurrentChapter: () => currentChapterFileName,
  parseCandlesInput,
  renderCanvasExample,
  setCandles: (nextCandles) => {
    candles = nextCandles;
  },
  setCandlesStatus,
  setPointer: (nextPointer) => {
    pointer = nextPointer;
  },
});

setCandlesStatus(`OK: ${candles.length} candles`);

initBookViewer({ renderCanvasExample });
