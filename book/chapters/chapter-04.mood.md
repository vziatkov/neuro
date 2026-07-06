# Price Scale Notes

## [Q1]

Question:
Why is price scale important in a trading chart?

Short answer:
Because interaction depends on converting pixels back into data. Rendering uses `price -> y`, but hover, tooltip, order placement, and zoom need `y -> price`.

## [P1]

Performance note:
Do not recompute scale state separately in every feature.

Keep one viewport/chart area model and pass scale functions into render, hover, and tooltip layers. That keeps the chart coherent when pan and zoom arrive.

