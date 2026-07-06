# Visible Range Notes

## [Q1]

Question:
Why not render all candles?

Short answer:
Because only the viewport is visible. Rendering all historical data wastes CPU/GPU work and makes hover, layout, and scaling more expensive.

## [P1]

Performance note:
The visible range is also the boundary for hit testing, labels, grid density, and LOD.

Once a chart has a viewport model, many features become smaller and faster.

