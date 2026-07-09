# Exercise 08: Coordinate Spaces
Graphics foundations before WebGL

## Goal
Understand the coordinate spaces that every chart, game, and WebGL scene uses.

Before WebGL, we can practice the idea in Canvas2D. The canvas still draws in screen pixels, but we can invent a world, place a camera inside it, and convert points between spaces. [Q1]

## Spaces
- **Screen space** is the canvas pixel space. `x` grows right, `y` grows down.
- **World space** is the space of the thing we model. A square can live at `x: -2..2`, `y: -1..3`.
- **View space** is the world seen through a camera. Move the camera and the world appears to move.
- **NDC** is normalized device coordinates. It maps the screen into `x: -1..1`, `y: -1..1`.
- **UV** is local object space for textures or surfaces. It usually maps a rectangle into `u: 0..1`, `v: 0..1`.

## Exercise
Draw a square in world coordinates.

Then implement:

```ts
worldToScreen(point)
screenToWorld(point)
```

After that, add a camera:

```ts
{
  x: 0,
  y: 0,
  zoom: 36
}
```

The square should not know anything about pixels. Only the camera transform knows how world points become screen points. [Q2]

## Interview angle
This is the bridge to WebGL:

```txt
model/world point -> camera/view transform -> normalized coordinates -> pixels
```

If you can explain this in Canvas2D, WebGL clip space becomes much less mysterious.
