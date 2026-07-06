# Exercise 04: Price Scale
Broker graphics lab

## Goal
Add a price axis and understand both directions of the mapping:

```txt
price -> y
y -> price
```

This is the bridge from drawing a static picture to building an interactive chart. A broker UI needs the reverse mapping for crosshair, tooltip, orders, selection, and zoom. [Q1]

## What the canvas demonstrates
- A right-side price axis.
- Horizontal tick lines.
- A highlighted sample Y coordinate.
- Reverse lookup from screen Y back to price.

## Mental model
Screen coordinates grow downward, but prices grow upward. So the scale is inverted:

```txt
max price -> top of chart
min price -> bottom of chart
```

The reverse function answers the interview question:

> If the mouse is at pixel Y, what price is the user pointing at?

## Next step
Once this is clear, the next exercise can become crosshair + tooltip. The tooltip is just this same scale plus nearest candle lookup by X.

