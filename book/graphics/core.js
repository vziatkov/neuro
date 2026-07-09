import { defaultChartTheme } from "./themes.js";

export function setupCanvas(canvas) {
  const rect = canvas.getBoundingClientRect();
  const dpr = Math.max(1, window.devicePixelRatio || 1);
  canvas.width = Math.round(rect.width * dpr);
  canvas.height = Math.round(rect.height * dpr);

  const ctx = canvas.getContext("2d");
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  return { ctx, width: rect.width, height: rect.height };
}

export function clearCanvas(ctx, width, height, theme = defaultChartTheme) {
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = theme.canvas.background;
  ctx.fillRect(0, 0, width, height);
}

export function drawGrid(ctx, width, height, step = 40, theme = defaultChartTheme) {
  ctx.save();
  ctx.strokeStyle = theme.canvas.grid;
  ctx.lineWidth = 1;

  for (let x = 0; x <= width; x += step) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }

  for (let y = 0; y <= height; y += step) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  ctx.restore();
}

export function drawLabel(ctx, text, x, y, color = defaultChartTheme.text.primary) {
  ctx.fillStyle = color;
  ctx.font = "12px Inter, system-ui, sans-serif";
  ctx.fillText(text, x, y);
}

export function getChartArea(width, height, padding = {}) {
  const chartPadding = {
    left: 46,
    right: 54,
    top: 30,
    bottom: 38,
    ...padding,
  };

  return {
    x: chartPadding.left,
    y: chartPadding.top,
    width: width - chartPadding.left - chartPadding.right,
    height: height - chartPadding.top - chartPadding.bottom,
    padding: chartPadding,
  };
}

export function drawChartFrame(ctx, area, color = defaultChartTheme.canvas.frame) {
  ctx.strokeStyle = color;
  ctx.strokeRect(area.x, area.y, area.width, area.height);
}

export function createLinearScale(domainMin, domainMax, rangeMin, rangeMax) {
  const domainSize = domainMax - domainMin || 1;
  return (value) => rangeMin + ((value - domainMin) / domainSize) * (rangeMax - rangeMin);
}

export function createPriceScale(minPrice, maxPrice, area) {
  return createLinearScale(maxPrice, minPrice, area.y, area.y + area.height);
}

export function createInversePriceScale(minPrice, maxPrice, area) {
  return createLinearScale(area.y + area.height, area.y, minPrice, maxPrice);
}

export function createCamera2D({ x = 0, y = 0, zoom = 1 } = {}, viewport) {
  const centerX = viewport.width * 0.5;
  const centerY = viewport.height * 0.5;

  return {
    worldToScreen(point) {
      return {
        x: centerX + (point.x - x) * zoom,
        y: centerY - (point.y - y) * zoom,
      };
    },
    screenToWorld(point) {
      return {
        x: x + (point.x - centerX) / zoom,
        y: y - (point.y - centerY) / zoom,
      };
    },
  };
}

export function getPriceRange(candles) {
  return {
    minPrice: Math.min(...candles.map((candle) => candle.low)),
    maxPrice: Math.max(...candles.map((candle) => candle.high)),
  };
}

export function prepareCandleChart(width, height, candles, padding) {
  const area = getChartArea(width, height, padding);
  const { minPrice, maxPrice } = getPriceRange(candles);
  const priceToY = createPriceScale(minPrice, maxPrice, area);
  const yToPrice = createInversePriceScale(minPrice, maxPrice, area);

  return { area, minPrice, maxPrice, priceToY, yToPrice };
}

export function drawCandle(ctx, candle, x, bodyWidth, priceToY, theme = defaultChartTheme) {
  const up = candle.close >= candle.open;
  const color = up ? theme.candles.up : theme.candles.down;
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

  ctx.fillStyle = up ? theme.candles.upFill : theme.candles.downFill;
  ctx.strokeStyle = color;
  ctx.fillRect(x - bodyWidth / 2, bodyTop, bodyWidth, bodyHeight);
  ctx.strokeRect(x - bodyWidth / 2, bodyTop, bodyWidth, bodyHeight);
}

export function drawCandles(ctx, candles, area, priceToY, options = {}) {
  const theme = options.theme ?? defaultChartTheme;
  const slot = area.width / candles.length;
  const bodyScale = options.bodyScale ?? 0.52;
  const minBodyWidth = options.minBodyWidth ?? 8;
  const bodyWidth = Math.max(minBodyWidth, slot * bodyScale);

  candles.forEach((candle, index) => {
    const x = area.x + slot * index + slot * 0.5;
    drawCandle(ctx, candle, x, bodyWidth, priceToY, theme);
  });
}
