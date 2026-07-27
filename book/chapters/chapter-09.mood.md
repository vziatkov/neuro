# Checkbox Control Notes

## [Q1]

Question:
Why start with a checkbox instead of a full controls framework?

Short answer:
Because it shows the whole interaction loop without architecture noise: user input changes state, state changes render output.

## [P1]

Production note:
Controls should not draw directly. They should update state and request a render. That keeps UI code separate from graphics code.
