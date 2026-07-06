# Crosshair Notes

## [Q1]

Question:
How do you find the candle under the cursor?

Short answer:
Convert screen X into a local chart coordinate, divide by candle slot width, clamp the result, and use that index to read the candle.

## [P1]

Performance note:
The crosshair should be cheap.

In a production chart, the crosshair can render in a lightweight overlay pass instead of redrawing every expensive layer.

