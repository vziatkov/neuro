# Exercise 09: Checkbox Control
First tiny UI control

## Goal
Add one simple control and use it to change what the canvas draws.

This is intentionally small. The checkbox does not create a new engine yet. It only changes one boolean state, then the canvas renders again. [Q1]

## Exercise
Toggle **Use green color** under the canvas.

The square changes color:

```txt
unchecked -> orange
checked   -> green
```

That is the basic loop behind every graphics playground:

```txt
control input -> state -> render
```

## Why this matters
Before zoom, pan, camera, and WebGL uniforms, we need the simplest version of interactivity.

If one checkbox can change one color clearly, the same pattern can later change:

- grid visibility
- camera position
- zoom
- candle style
- shader parameters
