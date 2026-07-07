export const defaultCandles = [
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

export function parseCandlesJson(jsonText) {
  const nextCandles = JSON.parse(jsonText);
  validateCandles(nextCandles);
  return nextCandles;
}

export function validateCandles(candles) {
  if (!Array.isArray(candles)) {
    throw new Error("Expected an array of candles");
  }
  if (candles.length === 0) {
    throw new Error("Expected at least one candle");
  }

  candles.forEach((candle, index) => {
    for (const key of ["open", "high", "low", "close"]) {
      if (typeof candle?.[key] !== "number" || !Number.isFinite(candle[key])) {
        throw new Error(`Candle ${index + 1}: ${key} must be a number`);
      }
    }
  });
}

export function createManyCandles(count) {
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
