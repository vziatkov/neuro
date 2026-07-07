# Exercise 07: Real Market Data
Broker graphics lab

## Goal
Connect the chart to a real public market data source.

This chapter uses Binance public REST klines. No API key is needed. Click **Load Binance REST** in the data panel and the chart will replace the local sample candles with real OHLCV data. [Q1]

## Endpoint
The first version uses a simple REST request:

```txt
GET https://data-api.binance.vision/api/v3/klines?symbol=BTCUSDT&interval=1h&limit=80
```

Each response row is a Binance kline:

```txt
[openTime, open, high, low, close, volume, closeTime, ...]
```

The lab maps that into the same object shape used by earlier chapters:

```ts
{
  time,
  open,
  high,
  low,
  close,
  volume
}
```

## What this connects
- Candlestick rendering from Exercise 03.
- Price mapping from Exercise 04.
- Crosshair thinking from Exercise 05.
- Visible range thinking from Exercise 06.
- Real external data instead of handmade fixtures.

## Interview angle
This is a useful story:

```txt
external exchange API -> normalized candle model -> chart renderer
```

The renderer should not care where data came from. Fake data, REST data, WebSocket updates, and cached data should all become the same candle shape.

