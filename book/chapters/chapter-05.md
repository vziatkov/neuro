# Exercise 05: Crosshair + Nearest Candle
Broker graphics lab

## Goal
Connect pointer movement to chart data.

Move the mouse over the canvas: the crosshair locks to the nearest candle by X, while the horizontal line maps pointer Y back to price. [Q1]

## What the canvas demonstrates
- `pointer.x` becomes a candle index.
- `pointer.y` becomes a price.
- The tooltip reads from the nearest OHLC object.
- The visual layer can update without changing markdown or sidebar state.

## Interview angle
This is where a chart stops being a picture and becomes an instrument.

The key explanation:

```txt
screen x -> nearest data index
screen y -> price
data index -> candle object
```

Once this works, tooltip, selection, order line dragging, and measuring tools all follow the same pattern.

