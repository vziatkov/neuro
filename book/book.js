import {
  clearCanvas,
  createCamera2D,
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

function drawCoordinateSpacesExample(ctx, width, height) {
  clearCanvas(ctx, width, height, chartTheme);
  drawGrid(ctx, width, height, 38, chartTheme);

  const compact = width < 720;
  const camera = { x: 0, y: 0, zoom: Math.max(32, Math.min(width, height) / 8) };
  const movedCamera = { x: 2, y: 0 };
  const transform = createCamera2D(camera, { width, height });
  const worldSquare = [
    { x: -2, y: -1 },
    { x: 2, y: -1 },
    { x: 2, y: 3 },
    { x: -2, y: 3 },
  ];
  const screenSquare = worldSquare.map(transform.worldToScreen);
  const origin = transform.worldToScreen({ x: 0, y: 0 });
  ctx.save();
  ctx.fillStyle = "rgba(255, 255, 255, 0.035)";
  ctx.fillRect(32, 26, width - 64, height - 52);

  ctx.strokeStyle = "rgba(255, 255, 255, 0.14)";
  ctx.lineWidth = 1;
  for (let worldX = -10; worldX <= 10; worldX += 1) {
    const a = transform.worldToScreen({ x: worldX, y: -6 });
    const b = transform.worldToScreen({ x: worldX, y: 6 });
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.stroke();
  }
  for (let worldY = -6; worldY <= 6; worldY += 1) {
    const a = transform.worldToScreen({ x: -10, y: worldY });
    const b = transform.worldToScreen({ x: 10, y: worldY });
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.stroke();
  }

  const xAxisA = transform.worldToScreen({ x: -10, y: 0 });
  const xAxisB = transform.worldToScreen({ x: 10, y: 0 });
  const yAxisA = transform.worldToScreen({ x: 0, y: -6 });
  const yAxisB = transform.worldToScreen({ x: 0, y: 6 });

  ctx.strokeStyle = chartTheme.text.success;
  ctx.fillStyle = chartTheme.text.success;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(xAxisA.x, xAxisA.y);
  ctx.lineTo(xAxisB.x, xAxisB.y);
  ctx.lineTo(xAxisB.x - 12, xAxisB.y - 7);
  ctx.moveTo(xAxisB.x, xAxisB.y);
  ctx.lineTo(xAxisB.x - 12, xAxisB.y + 7);
  ctx.stroke();

  ctx.strokeStyle = chartTheme.text.accent;
  ctx.fillStyle = chartTheme.text.accent;
  ctx.beginPath();
  ctx.moveTo(yAxisA.x, yAxisA.y);
  ctx.lineTo(yAxisB.x, yAxisB.y);
  ctx.lineTo(yAxisB.x - 7, yAxisB.y + 12);
  ctx.moveTo(yAxisB.x, yAxisB.y);
  ctx.lineTo(yAxisB.x + 7, yAxisB.y + 12);
  ctx.stroke();

  ctx.fillStyle = chartTheme.text.success;
  ctx.beginPath();
  ctx.arc(origin.x, origin.y, 6, 0, Math.PI * 2);
  ctx.fill();

  const movedCameraCenter = transform.worldToScreen(movedCamera);
  const cameraFrame = [
    { x: movedCamera.x - 2.4, y: movedCamera.y - 1.45 },
    { x: movedCamera.x + 2.4, y: movedCamera.y - 1.45 },
    { x: movedCamera.x + 2.4, y: movedCamera.y + 1.45 },
    { x: movedCamera.x - 2.4, y: movedCamera.y + 1.45 },
  ].map(transform.worldToScreen);

  ctx.strokeStyle = chartTheme.crosshair.line;
  ctx.lineWidth = 2;
  ctx.setLineDash([7, 6]);
  ctx.beginPath();
  ctx.moveTo(cameraFrame[0].x, cameraFrame[0].y);
  cameraFrame.slice(1).forEach((point) => ctx.lineTo(point.x, point.y));
  ctx.closePath();
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.fillStyle = chartTheme.crosshair.line;
  ctx.beginPath();
  ctx.arc(movedCameraCenter.x, movedCameraCenter.y, 5, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = chartTheme.crosshair.line;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(origin.x + 10, origin.y + 18);
  ctx.lineTo(movedCameraCenter.x - 10, movedCameraCenter.y + 18);
  ctx.lineTo(movedCameraCenter.x - 20, movedCameraCenter.y + 12);
  ctx.moveTo(movedCameraCenter.x - 10, movedCameraCenter.y + 18);
  ctx.lineTo(movedCameraCenter.x - 20, movedCameraCenter.y + 24);
  ctx.stroke();

  ctx.shadowColor = "rgba(242, 125, 38, 0.45)";
  ctx.shadowBlur = 18;
  ctx.fillStyle = chartTheme.primitives.rectangleFill;
  ctx.strokeStyle = chartTheme.text.accent;
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(screenSquare[0].x, screenSquare[0].y);
  screenSquare.slice(1).forEach((point) => ctx.lineTo(point.x, point.y));
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.shadowBlur = 0;

  drawLabel(ctx, "WORLD SQUARE", screenSquare[3].x, screenSquare[3].y - 16, chartTheme.text.accent);
  drawLabel(ctx, "fixed in world space", screenSquare[3].x, screenSquare[3].y - 2, chartTheme.text.primary);
  drawLabel(ctx, "UV (0,0)", screenSquare[0].x - 28, screenSquare[0].y + 22, chartTheme.text.warning);
  if (!compact) {
    drawLabel(ctx, "UV (1,1)", screenSquare[2].x + 10, screenSquare[2].y - 10, chartTheme.text.warning);
    drawLabel(ctx, "X axis", xAxisB.x - 54, xAxisB.y - 12, chartTheme.text.success);
    drawLabel(ctx, "Y axis", yAxisB.x + 12, yAxisB.y + 18, chartTheme.text.accent);
  }
  drawLabel(ctx, "camera/view window moved to x = 2", cameraFrame[3].x + 8, cameraFrame[3].y - 10, chartTheme.text.success);

  const pipelinePanel = compact ? { x: 24, y: 28, width: Math.min(286, width - 48), height: 102 } : { x: 48, y: 38, width: 288, height: 116 };
  ctx.fillStyle = chartTheme.canvas.panel;
  ctx.strokeStyle = chartTheme.canvas.panelBorder;
  ctx.lineWidth = 1;
  ctx.fillRect(pipelinePanel.x, pipelinePanel.y, pipelinePanel.width, pipelinePanel.height);
  ctx.strokeRect(pipelinePanel.x, pipelinePanel.y, pipelinePanel.width, pipelinePanel.height);
  drawLabel(ctx, "Coordinate pipeline", pipelinePanel.x + 18, pipelinePanel.y + 26, chartTheme.text.success);
  drawLabel(ctx, "world -> camera/view -> screen", pipelinePanel.x + 18, pipelinePanel.y + 50, chartTheme.text.primary);
  drawLabel(ctx, "camera moves; square stays fixed", pipelinePanel.x + 18, pipelinePanel.y + 72, chartTheme.text.warning);
  drawLabel(ctx, `active cam x ${camera.x}, y ${camera.y}, zoom ${camera.zoom.toFixed(1)}`, pipelinePanel.x + 18, pipelinePanel.y + 94, chartTheme.text.muted);

  if (pointer) {
    const world = transform.screenToWorld(pointer);
    const ndc = {
      x: (pointer.x / width) * 2 - 1,
      y: 1 - (pointer.y / height) * 2,
    };

    ctx.strokeStyle = chartTheme.crosshair.line;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(pointer.x, 0);
    ctx.lineTo(pointer.x, height);
    ctx.moveTo(0, pointer.y);
    ctx.lineTo(width, pointer.y);
    ctx.stroke();
    ctx.setLineDash([]);

    const pointerPanelWidth = Math.min(238, width - 48);
    const pointerPanel = {
      x: compact ? 24 : width - pointerPanelWidth - 28,
      y: compact ? height - 116 : 28,
      width: pointerPanelWidth,
      height: 98,
    };
    ctx.fillStyle = chartTheme.canvas.panel;
    ctx.strokeStyle = chartTheme.canvas.panelBorder;
    ctx.fillRect(pointerPanel.x, pointerPanel.y, pointerPanel.width, pointerPanel.height);
    ctx.strokeRect(pointerPanel.x, pointerPanel.y, pointerPanel.width, pointerPanel.height);
    drawLabel(ctx, `screen: ${pointer.x.toFixed(0)}, ${pointer.y.toFixed(0)}`, pointerPanel.x + 16, pointerPanel.y + 26, chartTheme.text.primary);
    drawLabel(ctx, `world: ${world.x.toFixed(2)}, ${world.y.toFixed(2)}`, pointerPanel.x + 16, pointerPanel.y + 48, chartTheme.text.success);
    drawLabel(ctx, `NDC: ${ndc.x.toFixed(2)}, ${ndc.y.toFixed(2)}`, pointerPanel.x + 16, pointerPanel.y + 70, chartTheme.text.warning);
  } else {
    const hintPanelWidth = Math.min(238, width - 48);
    const hintPanel = {
      x: compact ? 24 : width - hintPanelWidth - 28,
      y: compact ? height - 86 : 28,
      width: hintPanelWidth,
      height: 58,
    };
    ctx.fillStyle = chartTheme.canvas.panel;
    ctx.strokeStyle = chartTheme.canvas.panelBorder;
    ctx.fillRect(hintPanel.x, hintPanel.y, hintPanel.width, hintPanel.height);
    ctx.strokeRect(hintPanel.x, hintPanel.y, hintPanel.width, hintPanel.height);
    drawLabel(ctx, "move mouse over canvas", hintPanel.x + 16, hintPanel.y + 26, chartTheme.text.primary);
    drawLabel(ctx, "screen -> world -> NDC", hintPanel.x + 16, hintPanel.y + 48, chartTheme.text.muted);
  }

  ctx.restore();
}

function renderCanvasExample(fileName) {
  const { ctx, width, height } = setupCanvas(canvas);
  currentChapterFileName = fileName;
  if (fileName === "chapter-08.md") {
    setCandlesPanelVisible(false);
    setMarketDataControlsVisible(false);
    canvasTitleEl.textContent = "Exercise 08: Coordinate spaces";
    drawCoordinateSpacesExample(ctx, width, height);
    return;
  }

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
