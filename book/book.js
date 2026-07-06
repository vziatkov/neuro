import {
  clearCanvas,
  createPriceScale,
  drawChartFrame,
  drawGrid,
  drawLabel,
  getChartArea,
  getPriceRange,
  setupCanvas,
} from "./graphics/core.js";
import { initBookViewer } from "./app/book-viewer.js";

const canvas = document.getElementById("chapter-canvas");
const canvasTitleEl = document.getElementById("canvas-example-title");

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

function drawCandlesExample(ctx, width, height) {
  clearCanvas(ctx, width, height);
  drawGrid(ctx, width, height, 38);

  const candles = [
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

function renderCanvasExample(fileName) {
  const { ctx, width, height } = setupCanvas(canvas);

  if (fileName === "chapter-03.md") {
    canvasTitleEl.textContent = "Exercise 03: Candlestick chart";
    drawCandlesExample(ctx, width, height);
    return;
  }

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

initBookViewer({ renderCanvasExample });
