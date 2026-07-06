# Exercise 06: Visible Range
Broker graphics lab

## Goal
Render only the part of the dataset that is visible in the viewport.

The canvas example generates more candles than it draws. This is the first performance lesson for broker-style charts: history can be huge, but the screen is small. [Q1]

## What the canvas demonstrates
- A larger synthetic dataset.
- A selected visible range.
- Only visible candles are converted into geometry.
- Price scale is computed from visible candles.

## Mental model
Trading charts are viewport problems:

```txt
full data -> visible range -> renderable geometry
```

Pan changes the visible range. Zoom changes how many candles fit. The renderer should not care about the whole history on every frame.

## Next step
After visible range, pan becomes simple: move `visibleStart`. Zoom becomes changing `visibleCount` or candle width around the cursor.

