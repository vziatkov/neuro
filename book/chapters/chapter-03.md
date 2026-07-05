# Exercise 03: Candlestick Chart
Broker graphics lab

## Goal
Render a small OHLC dataset as broker-style candles on the canvas above.

This is the first useful trading-chart exercise: convert market data into screen coordinates, then draw each candle as a wick plus a body. [Q1]

## Input shape
Each candle can start as a tuple:

```ts
[open, high, low, close]
```

Later this becomes:

```ts
type Candle = {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
};
```

## What the canvas demonstrates
- Normalize `minPrice..maxPrice` into chart height.
- Invert Y because screen coordinates grow downward.
- Draw `high -> low` as the wick.
- Draw `open -> close` as the body.
- Use green for up candles and red for down candles.

## Interview angle
The important part is not the colors. The important part is explaining the mapping:

```txt
price -> normalized value -> screen y
index -> x slot -> candle center
```

Once this is clear, zoom, pan, hover, hit testing, and LOD become incremental problems rather than magic.

