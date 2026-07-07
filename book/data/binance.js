export function mapBinanceKlinesToCandles(klines) {
  return klines.map((kline) => ({
    time: kline[0],
    open: Number(kline[1]),
    high: Number(kline[2]),
    low: Number(kline[3]),
    close: Number(kline[4]),
    volume: Number(kline[5]),
  }));
}

export async function fetchBinanceCandles({ symbol, interval, limit = 80 }) {
  const url = new URL("https://data-api.binance.vision/api/v3/klines");
  url.searchParams.set("symbol", symbol);
  url.searchParams.set("interval", interval);
  url.searchParams.set("limit", String(limit));

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Binance request failed: ${response.status}`);
  }

  return mapBinanceKlinesToCandles(await response.json());
}
