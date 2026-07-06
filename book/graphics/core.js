export function setupCanvas(canvas) {
  const rect = canvas.getBoundingClientRect();
  const dpr = Math.max(1, window.devicePixelRatio || 1);
  canvas.width = Math.round(rect.width * dpr);
  canvas.height = Math.round(rect.height * dpr);

  const ctx = canvas.getContext("2d");
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  return { ctx, width: rect.width, height: rect.height };
}

export function clearCanvas(ctx, width, height) {
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#17120f";
  ctx.fillRect(0, 0, width, height);
}

export function drawGrid(ctx, width, height, step = 40) {
  ctx.save();
  ctx.strokeStyle = "rgba(255, 255, 255, 0.06)";
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

export function drawLabel(ctx, text, x, y, color = "#f5efe7") {
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

export function drawChartFrame(ctx, area, color = "rgba(255, 255, 255, 0.16)") {
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

export function getPriceRange(candles) {
  return {
    minPrice: Math.min(...candles.map((candle) => candle.low)),
    maxPrice: Math.max(...candles.map((candle) => candle.high)),
  };
}
