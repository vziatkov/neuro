# The Identity Drift

**Movement becomes identity**

---

## Idea

The field doesn’t just show traces — it **learns a movement signature** per participant.

Each trail has simple stats:

- **avgSpeed**
- **avgCurvature**
- **avgDensity** (or proximity to others)

After a few seconds this becomes a **movement signature**. The field can “recognize” **behavior**, not the user.

---

## Spectral color from behavior

Color is no longer random (e.g. hash of peer id). It is **derived from movement**:

- **speed → hue**
- **curvature → saturation**
- **density → brightness**

So each person’s trace gets a **spectral color** that comes from how they move.

---

## Drift

When the person changes style (faster, more curved, closer to others), the signature changes and the color **drifts**. The field shows **character of movement**.

---

## Strongest moment

If someone **leaves and comes back after 2 minutes** and moves in a similar way again, their color **returns**. The field doesn’t remember the user — it remembers **the behavior**.

---

## What it makes Observatory

Not just a field, but a **field of behavioral identities**. A **behavioral telescope**: motion → personality.

Relevant for: embodied cognition, behavioral identity, spatial presence.

---

## Implementation (when we add it)

Per peer (and self): maintain rolling stats

```js
signature = { speedAvg, curvatureAvg, density }
```

Map to HSV, then draw trail with that color. Update signature every N points or every second.

---

## Full stack with Identity

Trace → Resonance → Constellation → Listener → Observer → **Identity Drift**.

**Movement becomes identity.**
