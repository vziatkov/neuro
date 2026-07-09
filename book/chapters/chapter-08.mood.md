# Coordinate Spaces Notes

## [Q1]

Question:
Why do graphics apps use multiple coordinate spaces instead of drawing everything directly in pixels?

Short answer:
Because pixels are a display detail. World space lets your model stay stable while camera, zoom, pan, device pixel ratio, and viewport size change around it.

## [Q2]

Question:
What should own `worldToScreen` and `screenToWorld`?

Short answer:
The camera or viewport transform should own it. The object should describe itself in world/local coordinates; the renderer applies transforms when drawing.

## [P1]

Production note:
Charts use the same idea. Time/price are world coordinates, the visible range is the camera, and mouse hit testing starts with `screenToWorld`.
