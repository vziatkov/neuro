# Candlestick Notes

## [Q1]

Question:
How do you render financial candles efficiently?

Short answer:
Treat candles as geometry. Convert price/time into screen coordinates, draw wicks and bodies, and keep the render loop independent from UI state.

Longer answer:
For Canvas2D, start with a simple loop over visible candles. For WebGL, pack candle attributes into buffers and render bodies/wicks in batches. The key architectural decision is separating world coordinates, viewport transforms, and interaction state.

## [P1]

Performance trap:
Rendering all historical candles every mouse move is fine for a tiny demo and bad for a real broker chart.

First fix:
Only render visible candles, cache scale calculations, and move hover/crosshair into a lightweight overlay pass.

