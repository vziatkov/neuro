# Woodland / Matrix — Design bundle (bilingual)

**Cursor / local context:** unified blueprint for the **Higgs-field card** (visual + physics + stack) and the **Matrix v4.3 minimal demo** (one readable loop).  
**Файл:** `public/woodland/static/CARD_AND_DEMO_STRATEGY_EN_RU.md`

---

# Part A — Card concept: Higgs field & particle birth (v1.0)

## English

### Vision

Build an interactive experience of **matter emerging from quantum noise**. Avoid visual clutter. Aesthetic: deep black, luminescent green, procedural grid, physically motivated deformation.

### Color tokens (single source — use everywhere)

| Token | HEX | Use |
| :--- | :--- | :--- |
| Void | `#000000` | L0 |
| Matrix green (primary) | `#63ff9b` | Grid, particle tint, HUD — **same as existing Woodland demos** (`try5a`, `card-field-birth-v1`) |
| Matrix green (punch, optional) | `#00FF41` | **Sparingly:** L3 peak / rim only; do **not** mix both greens in one layer |

### Layer stack (Z-order)

| Layer | Name | Tech / asset | Blend | Role |
| :--- | :--- | :--- | :--- | :--- |
| **L0** | The Void | Solid `#000` | Normal | Clean base for glow. |
| **L1** | Higgs Soup | Video loop (e.g. Veo) | **Screen**, ~30% opacity | Slow “boiling” green noise; field breathing. |
| **L2** | Gravity Grid | Procedural mesh | Normal, thin lines | Fine green grid; **warps** toward particle center. |
| **L3** | The Particle | Sprite sheet / video | **Add** | Concentrated energy blob (boson / quark read). |
| **L4** | Data UI | Canvas / text | Normal | Mass, spin, label. |

### Mechanics

**Mass effect (grid warp)**  
When L3 appears, L2 vertices shift along Z (or apparent depth) with Gaussian falloff from particle center:

\[
Z_{\text{offset}} = A \cdot e^{-\frac{(x-x_0)^2 + (y-y_0)^2}{2\sigma^2}}
\]

- \(A\) — particle “weight”  
- \(\sigma\) — influence radius  

### Performance budget (codegen / LLM)

- **Target:** **60 FPS** @ 1080p on a mid-range laptop GPU.  
- **Particles (CPU sprites):** default **≤ 6.5k**; hard cap **≤ 12k** unless Worker / instanced mesh / GPU sim.  
- **L1 video:** one lightweight loop; prefer **≤ 720p**; single **Screen** pass — don’t stack multiple full-screen videos.

**Parallax (gyroscope) — must ship**  
**Not optional** for this card: offset **L1 / L2 / L3** with different coefficients on device tilt → “aquarium” depth. This is the main **wow** on a physical card; keep in scope even if the web MVP ships flat first.

### Animation timeline (“Ready” sequence)

1. **Idle** — only L1 subtly pulses.  
2. **Activation** — L2 eases into a central sag; sub-bass swell (optional).  
3. **Synthesis (peak)** — L3 flashes in (birth-from-noise clip); **Add** rim on grid/void.  
4. **Observation** — particle stabilizes; L4 shows **READY** + parameters.

### Assets (implementation)

- `higgs_field_loop.mp4` — base noise (reference in `static/`).  
- `particle_birth_atlas.png` — birth sequence (can be sliced via script).  
- Grid shader (GLSL / WGSL / HLSL) — dynamic warp.

### Next implementation forks (pick one)

- **A.** Grid shader skeleton (vertex displacement + uniforms for \((x_0,y_0), A, \sigma\)).  
- **B.** Python script: video → sprite atlas + JSON timings.

---

## Русский

### Видение

Интерактив про **проявление материи из квантового шума**. Без визуального мусора. Эстетика: глубокий чёрный, люминесцентный зелёный, процедурная сетка, физически мотивированная деформация.

### Цветовые токены (единый источник)

| Токен | HEX | Где |
| :--- | :--- | :--- |
| Пустота | `#000000` | L0 |
| Matrix green (основной) | `#63ff9b` | Сетка, частица, HUD — **как в текущих Woodland-демо** |
| Matrix green (акцент, опционально) | `#00FF41` | Только пик L3 / кромка; **не смешивать** оба зелёных в одном слое |

### Стек слоёв (Z-order)

| Слой | Имя | Техника / ассет | Blend | Назначение |
| :--- | :--- | :--- | :--- | :--- |
| **L0** | Пустота | Заливка `#000` | Normal | Чистая база под свечение. |
| **L1** | Суп поля Хиггса | Видео-луп | **Screen**, ~30% | Медленный «кипящий» шум, дыхание поля. |
| **L2** | Гравитационная сетка | Процедурная сетка | Normal, тонкие линии | Зелёная сетка, **прогиб** к центру частицы. |
| **L3** | Частица | Спрайтшит / видео | **Add** | Сгусток энергии (бозон/кварк как образ). |
| **L4** | Data UI | Canvas / текст | Normal | Масса, спин, подпись. |

### Механика

**Эффект массы (деформация сетки)**  
При появлении L3 вершины L2 смещаются по гауссову затуханию от центра частицы (см. формулу выше в English-блоке — та же \(Z_{\text{offset}}\)).

### Performance (генерация кода / LLM)

- **Цель:** **60 FPS** @ 1080p на типичном ноутбуке.  
- **Частицы (CPU-спрайты):** по умолчанию **≤ 6.5k**; жёсткий потолок **≤ 12k** без Worker / instancing / GPU-симуляции.  
- **L1 видео:** один лёгкий луп; лучше **≤ 720p**; один проход **Screen** — не стекать несколько полноэкранных роликов.

**Параллакс (гироскоп) — обязателен**  
Для этой карточки **не выкидывать**: разные коэффициенты для **L1 / L2 / L3** при наклоне — главный **wow** у физической карточки; веб-MVP может быть плоским первым шагом, но гиро остаётся в продуктовом скоупе.

### Таймлайн анимации («Ready»)

1. **Idle** — пульсирует только L1.  
2. **Активация** — L2 плавно прогибается к центру; низкий гул (опционально).  
3. **Синтез (пик)** — вспышка L3 (рождение из шума); режим **Add** подсвечивает сетку/фон.  
4. **Наблюдение** — стабилизация; L4: **READY** и параметры.

### Ассеты

- `higgs_field_loop.mp4` — базовый шум (референсы в `static/`).  
- `particle_birth_atlas.png` — атлас рождения (нарезка скриптом).  
- Шейдер сетки — динамический прогиб.

---

# Part B — Matrix v4.3: minimal demo strategy

## English

### Goal

Ship a **clear, minimal, deterministic** demo.

Not a system showcase. Not a generic visual experiment. One idea:

> **A form emerges from noise and dissolves back.**

### Core principle

The engine can be deep — the **surface** stays simple.

- Depth stays inside the implementation.  
- Simplicity stays outside (what the viewer sees in seconds).

### Single demo scenario (loop)

1. Empty field (particles, subtle motion)  
2. Disturbance (wave / activation)  
3. Formation (e.g. tree / glyph from particles)  
4. Stabilization — **`READY`**  
5. Dissolve back into the field  

→ repeat.

### Keep

- Particle system (`Float32Array`)  
- Types: `core | dust | tracer | flare`  
- Global time `t`  
- Phase-based behavior  
- Clean Pixi rendering / batching  
- **Performance:** stay within **Part A** budget (60 FPS, particle cap) unless you upgrade the pipeline  
- **Accent color:** stick to **`#63ff9b`** for consistency with Woodland builds  

### Remove (for this demo)

- Extra UI panels  
- Multiple unrelated objects (rose, variants)  
- Overlays / labels except **`READY`**  
- Experimental visuals not required by the brief  

### Mental model

```
state = f(seed, t, particleId)
```

- `seed` — deterministic world  
- `t` — phase \(0 \to 1\)  
- `particleId` — variation  

### Particle topology (summary)

- **Position** `x, y` · **velocity** `vx, vy`  
- **type** · **alpha** · **size** · **energy** · **phaseOffset**  

**Roles:** `core` holds structure · `dust` background · `tracer` leads formation · `flare` highlights emergence.

### Behavior layers

1. Field drift (baseline)  
2. Attract / repel toward target shape  
3. Type-specific behavior  
4. `state(t)`: birth → formation → ready → dissolve  

### Visual layers (optional, tight control)

- Background field (video / noise) → Screen  
- Event layer (collapse) → Add  
- Particles → main pass  

⚠️ Do not overload.

### Definition of done

Open → **understand in ~3 seconds**: field → event → form → **READY** → dissolve. No wall of text.

### Positioning line (if needed)

> “I explored a more expressive direction; this is the minimal version aligned with the task.”

### Final reminder

Do not build a collider. Build **one readable loop**, **one clean button** (metaphorically: one scenario), **one stable story**.

---

## Русский

### Цель

Дать **простой, детерминированный, читаемый** демо-цикл.

Не витрину системы. Не абстрактный визуальный эксперимент. Одна мысль:

> **Форма вырастает из шума и растворяется обратно.**

### Принцип

Мощность движка — **внутри**; наружу — **один сценарий**, понятный с первого взгляда.

### Единственный сценарий (петля)

1. Пустое поле (частицы, лёгкое движение)  
2. Возмущение (волна / активация)  
3. Формирование (дерево / глиф из частиц)  
4. Стабилизация — **`READY`**  
5. Растворение обратно в поле  

→ повтор.

### Оставляем

- Систему частиц (`Float32Array`)  
- Типы: `core | dust | tracer | flare`  
- Глобальное время `t`  
- Поведение по фазам  
- Чистый рендер Pixi / батчинг  
- **Лимиты:** бюджет из **части A** (FPS, число частиц), пока не усложняем пайплайн  
- **Цвет акцента:** **`#63ff9b`**, как в остальных Woodland-сборках  

### Убираем (для этого демо)

- Лишние панели UI  
- Несколько несвязных объектов  
- Оверлеи / подписи кроме **`READY`**  
- Эксперименты вне формулировки задачи  

### Модель состояния

```
state = f(seed, t, particleId)
```

### Слои поведения

1. Дрейф поля  
2. Притяжение / отталкивание к целевой форме  
3. Поведение по типу  
4. Фазы: рождение → формирование → ready → растворение  

### Визуальные слои (осторожно)

- Фон (видео / шум) → Screen  
- Событие (коллапс) → Add  
- Частицы — основной проход  

### Критерий готовности

Открыл → за **~3 секунды** ясно: поле → событие → форма → **READY** → исчезновение. Без лекции.

### Формулировка для лида

> «Была более выразительная ветка; здесь — минимальная версия под задачу.»

### Напоминание

Не строить коллайдер. Строить **одну читаемую петлю** и **один ясный момент**.

---

## Связь двух частей (кратко / short bridge)

| | English | Русский |
| :--- | :--- | :--- |
| **Card (Part A)** | Rich **presentation layer**: soup video, warped grid, particle burst, gyro — “Higgs” **metaphor**. | Богатый **визуальный слой**: суп, сетка, вспышка частицы, гиро — **метафора** поля. |
| **Demo (Part B)** | **Narrative spine** for code: same emotional arc (noise → form → READY → dissolve) with **minimal** UI. | **Сюжетный каркас** для кода: тот же арка (шум → форма → READY → раствор), **минимум** интерфейса. |
| **Together** | Part A can skin L1–L4; Part B defines **what must happen** in time. | Часть A задаёт **оболочку** слоёв; часть B — **что обязано произойти** во времени. |

---

## Review snapshot (why this doc works as a “project bible”)

- **Gaussian \(Z_{\text{offset}}\)** — fixed reference for grid warp shaders (no random deformation).  
- **L0–L4 + Screen / Add** — blend stack is explicit; less compositing chaos.  
- **Minimal demo (Part B)** — noise → wave → assembly → **READY** in 3–5s; engine depth stays internal.  
- **v1.1 adds:** color HEX lock, FPS/particle budget, **gyro must ship** for the card wow.

---

*Version 1.1 · local Cursor context · `public/woodland/static/`*
