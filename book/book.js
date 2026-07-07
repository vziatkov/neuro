import {
  clearCanvas,
  drawCandles,
  drawChartFrame,
  drawGrid,
  drawLabel,
  getChartArea,
  prepareCandleChart,
  setupCanvas,
} from "./graphics/core.js";
import { defaultChartTheme as chartTheme } from "./graphics/themes.js";
import { initBookViewer } from "./app/book-viewer.js";
import { registerLabInteractions } from "./app/lab-interactions.js";
import { fetchBinanceCandles } from "./data/binance.js";
import { createManyCandles, defaultCandles, parseCandlesJson } from "./data/candles.js";

const canvas = document.getElementById("chapter-canvas");
const canvasTitleEl = document.getElementById("canvas-example-title");
const candlesDataPanel = document.getElementById("candles-data-panel");
const candlesDataInput = document.getElementById("candles-data-input");
const candlesDataStatus = document.getElementById("candles-data-status");
const marketDataControls = document.getElementById("market-data-controls");
const marketSymbolInput = document.getElementById("market-symbol-input");
const marketIntervalInput = document.getElementById("market-interval-input");
const loadMarketDataButton = document.getElementById("load-market-data-button");

let candles = structuredClone(defaultCandles);
let pointer = null;
let currentChapterFileName = "";

candlesDataInput.value = JSON.stringify(candles, null, 2);

function setCandlesPanelVisible(isVisible) {
  candlesDataPanel.hidden = !isVisible;
}

function setMarketDataControlsVisible(isVisible) {
  marketDataControls.hidden = !isVisible;
}

function setCandlesStatus(message, isError = false) {
  candlesDataStatus.textContent = message;
  candlesDataStatus.classList.toggle("error", isError);
}

function parseCandlesInput() {
  return parseCandlesJson(candlesDataInput.value);
}

function syncCandlesInput() {
  candlesDataInput.value = JSON.stringify(candles, null, 2);
}

async function loadBinanceCandles() {
  const symbol = marketSymbolInput.value.trim().toUpperCase() || "BTCUSDT";
  const interval = marketIntervalInput.value;

  setCandlesStatus(`Loading ${symbol} ${interval} from Binance...`);
  loadMarketDataButton.disabled = true;

  try {
    candles = await fetchBinanceCandles({ symbol, interval });
    syncCandlesInput();
    setCandlesStatus(`Loaded ${candles.length} ${symbol} candles`);
    renderCanvasExample("chapter-07.md");
  } catch (error) {
    setCandlesStatus(error.message, true);
  } finally {
    loadMarketDataButton.disabled = false;
  }
}

function drawCoordinateExample(ctx, width, height) {
  clearCanvas(ctx, width, height, chartTheme);
  drawGrid(ctx, width, height, undefined, chartTheme);

  const origin = { x: width * 0.5, y: height * 0.58 };
  ctx.strokeStyle = chartTheme.text.accent;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(32, origin.y);
  ctx.lineTo(width - 32, origin.y);
  ctx.moveTo(origin.x, height - 28);
  ctx.lineTo(origin.x, 28);
  ctx.stroke();

  ctx.fillStyle = chartTheme.text.success;
  ctx.beginPath();
  ctx.arc(origin.x + 110, origin.y - 72, 6, 0, Math.PI * 2);
  ctx.fill();

  drawLabel(ctx, "screen y grows down", 34, 34, chartTheme.text.muted);
  drawLabel(ctx, "world point (x: 110, y: 72)", origin.x + 122, origin.y - 78, chartTheme.text.success);
}

function drawPrimitiveExample(ctx, width, height) {
  clearCanvas(ctx, width, height, chartTheme);
  drawGrid(ctx, width, height, 36, chartTheme);

  ctx.strokeStyle = chartTheme.text.success;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(width * 0.16, height * 0.72);
  ctx.lineTo(width * 0.42, height * 0.26);
  ctx.stroke();

  ctx.fillStyle = chartTheme.primitives.rectangleFill;
  ctx.strokeStyle = chartTheme.text.accent;
  ctx.lineWidth = 2;
  ctx.fillRect(width * 0.5, height * 0.32, width * 0.24, height * 0.28);
  ctx.strokeRect(width * 0.5, height * 0.32, width * 0.24, height * 0.28);

  ctx.fillStyle = chartTheme.primitives.triangleFill;
  ctx.strokeStyle = chartTheme.text.warning;
  ctx.beginPath();
  ctx.moveTo(width * 0.76, height * 0.72);
  ctx.lineTo(width * 0.86, height * 0.36);
  ctx.lineTo(width * 0.94, height * 0.72);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  drawLabel(ctx, "line", width * 0.16, height * 0.76, chartTheme.text.success);
  drawLabel(ctx, "rect", width * 0.5, height * 0.28, chartTheme.text.accent);
  drawLabel(ctx, "triangle", width * 0.8, height * 0.78, chartTheme.text.warning);
}

function drawCandlesExample(ctx, width, height, candles) {
  clearCanvas(ctx, width, height, chartTheme);
  drawGrid(ctx, width, height, 38, chartTheme);

  const { area, minPrice, maxPrice, priceToY } = prepareCandleChart(width, height, candles);

  drawChartFrame(ctx, area, chartTheme.canvas.frame);
  drawCandles(ctx, candles, area, priceToY, { theme: chartTheme });

  drawLabel(ctx, `high ${maxPrice}`, area.x + area.width + 10, priceToY(maxPrice) + 4, chartTheme.text.muted);
  drawLabel(ctx, `low ${minPrice}`, area.x + area.width + 10, priceToY(minPrice), chartTheme.text.muted);
  drawLabel(ctx, "OHLC -> screen coordinates -> wick + body", area.x, height - 14, chartTheme.text.primary);
}

function drawPriceScaleExample(ctx, width, height, candles) {
  clearCanvas(ctx, width, height, chartTheme);
  drawGrid(ctx, width, height, 38, chartTheme);

  const { area, minPrice, maxPrice, priceToY, yToPrice } = prepareCandleChart(width, height, candles, { right: 86 });
  const ticks = 5;

  drawChartFrame(ctx, area, chartTheme.canvas.frame);

  ctx.strokeStyle = chartTheme.crosshair.axis;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(area.x + area.width, area.y);
  ctx.lineTo(area.x + area.width, area.y + area.height);
  ctx.stroke();

  for (let index = 0; index <= ticks; index += 1) {
    const price = minPrice + ((maxPrice - minPrice) / ticks) * index;
    const y = priceToY(price);

    ctx.strokeStyle = chartTheme.crosshair.guide;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(area.x, y);
    ctx.lineTo(area.x + area.width, y);
    ctx.stroke();

    drawLabel(ctx, price.toFixed(2), area.x + area.width + 12, y + 4, chartTheme.text.primary);
  }

  const sampleY = area.y + area.height * 0.38;
  const samplePrice = yToPrice(sampleY);
  ctx.strokeStyle = chartTheme.text.success;
  ctx.setLineDash([6, 6]);
  ctx.beginPath();
  ctx.moveTo(area.x, sampleY);
  ctx.lineTo(area.x + area.width, sampleY);
  ctx.stroke();
  ctx.setLineDash([]);

  drawLabel(ctx, `mouse y -> ${samplePrice.toFixed(2)}`, area.x + 12, sampleY - 10, chartTheme.text.success);
  drawLabel(ctx, "price axis is just an inverted linear scale", area.x, height - 14, chartTheme.text.primary);
}

function drawCrosshairExample(ctx, width, height, candles) {
  drawCandlesExample(ctx, width, height, candles);

  if (!pointer) {
    drawLabel(ctx, "move mouse over the canvas", 58, 54, chartTheme.text.muted);
    return;
  }

  const area = getChartArea(width, height);
  const { yToPrice } = prepareCandleChart(width, height, candles);
  const slot = area.width / candles.length;
  const nearestIndex = Math.max(0, Math.min(candles.length - 1, Math.floor((pointer.x - area.x) / slot)));
  const nearestCandle = candles[nearestIndex];
  const candleX = area.x + slot * nearestIndex + slot * 0.5;
  const price = yToPrice(pointer.y);

  ctx.strokeStyle = chartTheme.crosshair.line;
  ctx.lineWidth = 1;
  ctx.setLineDash([5, 5]);
  ctx.beginPath();
  ctx.moveTo(candleX, area.y);
  ctx.lineTo(candleX, area.y + area.height);
  ctx.moveTo(area.x, pointer.y);
  ctx.lineTo(area.x + area.width, pointer.y);
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.fillStyle = chartTheme.canvas.panel;
  ctx.strokeStyle = chartTheme.canvas.panelBorder;
  ctx.fillRect(area.x + 14, area.y + 14, 220, 86);
  ctx.strokeRect(area.x + 14, area.y + 14, 220, 86);

  drawLabel(ctx, `nearest candle: ${nearestIndex + 1}`, area.x + 28, area.y + 38, chartTheme.text.success);
  drawLabel(ctx, `O ${nearestCandle.open}  H ${nearestCandle.high}`, area.x + 28, area.y + 60, chartTheme.text.primary);
  drawLabel(ctx, `L ${nearestCandle.low}  C ${nearestCandle.close}`, area.x + 28, area.y + 80, chartTheme.text.primary);
  drawLabel(ctx, `y -> price ${price.toFixed(2)}`, area.x + 28, area.y + 100, chartTheme.text.muted);
}

function drawVisibleRangeExample(ctx, width, height) {
  clearCanvas(ctx, width, height, chartTheme);
  drawGrid(ctx, width, height, 38, chartTheme);

  const allCandles = createManyCandles(80);
  const visibleStart = 28;
  const visibleCount = 24;
  const visibleCandles = allCandles.slice(visibleStart, visibleStart + visibleCount);
  const { area, priceToY } = prepareCandleChart(width, height, visibleCandles);

  drawChartFrame(ctx, area, chartTheme.canvas.frame);
  drawCandles(ctx, visibleCandles, area, priceToY, { bodyScale: 0.45, minBodyWidth: 5, theme: chartTheme });

  drawLabel(ctx, `dataset: ${allCandles.length} candles`, area.x, 36, chartTheme.text.muted);
  drawLabel(ctx, `rendered visible range: ${visibleStart + 1}-${visibleStart + visibleCount}`, area.x, 56, chartTheme.text.success);
  drawLabel(ctx, "real charts render the viewport, not the whole history", area.x, height - 14, chartTheme.text.primary);
}

function drawRealMarketDataExample(ctx, width, height, candles) {
  drawCandlesExample(ctx, width, height, candles);

  const symbol = marketSymbolInput.value.trim().toUpperCase() || "BTCUSDT";
  const interval = marketIntervalInput.value;
  drawLabel(ctx, `${symbol} ${interval} via Binance REST`, 58, 54, chartTheme.text.success);
  drawLabel(ctx, "click Load Binance REST to refresh the dataset", 58, 74, chartTheme.text.muted);
}

function renderCanvasExample(fileName) {
  const { ctx, width, height } = setupCanvas(canvas);
  currentChapterFileName = fileName;

  if (fileName === "chapter-07.md") {
    setCandlesPanelVisible(true);
    setMarketDataControlsVisible(true);
    canvasTitleEl.textContent = "Exercise 07: Real market data";
    drawRealMarketDataExample(ctx, width, height, candles);
    return;
  }

  setMarketDataControlsVisible(false);

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
  clearCanvas(ctx, width, height, chartTheme);
  drawLabel(ctx, "No canvas exercise for this note yet.", 28, 38, chartTheme.text.muted);
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

loadMarketDataButton.addEventListener("click", () => {
  loadBinanceCandles();
});

setCandlesStatus(`OK: ${candles.length} candles`);

initBookViewer({ renderCanvasExample });
