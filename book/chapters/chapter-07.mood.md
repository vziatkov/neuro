# Real Market Data Notes

## [Q1]

Question:
How do you connect a chart to a real exchange API safely?

Short answer:
Normalize external data at the boundary. Convert the exchange response into your internal candle model, then let the renderer use only that model.

## [P1]

Production note:
REST is a good first step for historical candles and page load. WebSocket is better for updating the latest candle, but it should feed the same normalized candle store instead of bypassing the renderer.

