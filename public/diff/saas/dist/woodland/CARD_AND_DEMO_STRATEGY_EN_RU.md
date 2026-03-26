# Woodland / Matrix — Design bundle (bilingual)

**Cursor / local context:** unified blueprint for the **Higgs-field card** (visual + physics + stack) and the **Matrix v4.4 minimal demo** (one readable loop; **phase-centered** particle model — Part E).  
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

### 3. The Observer’s breath (emergence)

This turns a “particle system” into something **alive**: **emergent behavior** — macro-structure from micro-events.

- **Trigger (resonance):** When **neighboring tiles** host the right particle mix (e.g. critical “boson” / “quark” presence), their **local rhythms begin to synchronize**. At **100% sync**, a **macro-beat** engages.  
- **Long-term pulse:** All layers **L1–L3** (and the grid) breathe together: smooth **scale** \(1.0 \leftrightarrow \sim 1.05\) and **bloom / brightness** modulation. **Timing:** slow cycle — **~4–6 s** per inhale+exhale (roughly **0.1–0.2 Hz**). This **contrasts** with the Pulsar’s fast splatter (ms-scale).  
- **Observer coupling:** Gyro tilt or **tap** can briefly **detune** the rhythm (arrhythmia), then **recover** — the observer is **inside** the feedback loop, not outside.  
- **Metaphor:** The field “notices” stable matter; **READY** (Part B) can evolve from a one-shot label into a **sustained** living pulse — resonance as recognition.

**Implementation hints:** drive breath from a single `macroPhase` ∈ \([0,1]\) (sine ease); multiply root container scale; one bloom uniform; sync only after `resonanceMeter >= 1` from tile state.

### Three temporal scales (clocks)

| Scale | Typical timing | Role |
| :--- | :--- | :--- |
| **Micro** | ms | Pulsar splashes, collisions |
| **Meso** | ~1 s | Particle life inside a tile; tile rule updates |
| **Macro** | 4–6 s | Observer’s breath; global readiness / “organism” feel |

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

### 3. Дыхание наблюдателя (emergence / эмерджентность)

Это не просто анимация, а **резонанс**: из хаоса микро-событий рождается **макро-структура** — система частиц становится «живым организмом».

- **Условие (резонанс):** В **соседних плитках** при определённом наборе типов частиц (например, критическая масса «бозонов» / «кварков») локальные ритмы **синхронизируются**. При **100%** синхронизации включается **макро-такт**.  
- **Долгий пульс:** Слои **L1–L3** и грид **дышат** вместе: плавный **масштаб** \(1.0 \leftrightarrow \sim 1.05\) и модуляция **bloom / яркости**. **Тайминг:** **~4–6 с** на цикл «вдох+выдох» (**~0.1–0.2 Гц**). Контраст с быстрой суетой Пульсара (миллисекунды).  
- **Связь с наблюдателем:** Наклон гироскопа или **тап** кратко **сбивают** ритм (аритмия), затем ритм **восстанавливается** — наблюдатель **внутри** петли обратной связи.  
- **Метафора:** Поле как бы «узнаёт» стабильную материю; **READY** (часть B) может перейти из разового текста в **постоянный** живой пульс.

**К реализации:** один `macroPhase` на сцену; масштаб корня; один uniform для bloom; «дыхание» включается при `resonanceMeter >= 1` из состояния плиток.

### Три временные шкалы

| Шкала | Порядок | Роль |
| :--- | :--- | :--- |
| **Микро** | мс | Брызги Пульсара, столкновения |
| **Мезо** | ~сек | Жизнь частицы в плитке; смена правил плитки |
| **Макро** | 4–6 с | Дыхание наблюдателя; глобальная «готовность» |

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

# Part C — Architecture: Grid + Pulsar + micro-contexts

> This is what makes the system **fractal** and deep while staying **governable**: not “a pile of particles,” but a **hierarchy** — global scaffold, chaotic source, local laws.

## English

### 1. Global level — the grid & outer context

- **Grid:** The scene **scaffold**. Each cell **Tile\(_{i,j}\)** is not just a square — it is a **container** with its own **outer context** (rule bundle).  
- **Tile rules (examples):**  
  - *Tile\[0,0\]:* gravity bias left; particles live longer.  
  - *Tile\[0,1\]:* EM-style swirl; short lifetime; spiral bias.  
- **Visual:** The grid may be drawn (thin green lines) or **invisible**, but its **physical influence** is always on.

### 2. Energy source — the Pulsar (emitter)

- **Role:** A chaotic, intense “storm” of **base** particles (`dust` / `tracer` class).  
- **Behavior:** It **rains** particles onto the grid like rain on a chessboard. It does **not** know tile rules — it only injects **entropy**.  
- **Visual:** A bright **pulsing** point or zone; splashes / sprays outward.

### 3. Local level — micro-contexts (inner particles)

- **Interaction:** When a base particle from the Pulsar **enters** Tile\(_{i,j}\), it **immediately** follows that tile’s rules.  
- **Micro-ensemble:** Inside each tile, a **unique** local population emerges: born from Pulsar “rain,” governed by **local** laws.

### Card workflow (narrative)

1. **Rest** — Grid visible (or implied). Pulsar **off**. Tile micro-contexts **empty**.  
2. **Activation (Pulsar start)** — Chaotic emission; particles **cross** the grid.  
3. **Fill** — Particles land in tiles; e.g. Tile\[0,0\] → vortex; Tile\[0,1\] → line / spiral.  
4. **Outcome (the form)** — Chaos resolves into a **pattern** dictated by grid geometry: **form from noise**. Pulsar supplies **noise**; grid supplies **shape**.

**Implementation hint:** `tileId = floor(x / tileW), floor(y / tileH)` → lookup **rule vector** (forces, lifetime, spawn modifiers). Pulsar only sets initial `(x,y,v, type)`.

---

## Русский

### 1. Глобальный уровень — сетка и внешний контекст

- **Сетка:** **Каркас** сцены. Каждая ячейка **Tile\(_{i,j}\)** — не просто квадрат, а **контейнер** с уникальным **внешним контекстом** (набор правил).  
- **Примеры правил плитки:**  
  - *Tile\[0,0\]:* гравитация тянет влево; частицы живут дольше.  
  - *Tile\[0,1\]:* поле закручивает в спираль; жизнь короче.  
- **Визуал:** Сетка может быть видна (тонкие зелёные линии) или скрыта, но **влияние** на физику постоянно.

### 2. Источник энергии — Пульсар (эмиттер)

- **Роль:** Хаотичный интенсивный «шторм» базовых частиц (`dust` / `tracer`).  
- **Поведение:** «Накидывает» частицы на грид, как дождь на доску. **Не знает** правил плиток — только создаёт **энтропию**.  
- **Визуал:** Яркая **пульсирующая** точка или зона; брызги / разлёт.

### 3. Локальный уровень — микро-контексты

- **Взаимодействие:** Частица от Пульсара, попав в зону Tile\(_{i,j}\), **мгновенно** подчиняется правилам этой плитки.  
- **Микро-ансамбль:** Внутри плитки вырастает **свой** набор частиц: порождён «дождём» Пульсара, живёт по **локальным** законам.

### Сценарий карточки

1. **Покой** — сетка видна (или подразумевается). Пульсар **выключен**. Плитки **пусты**.  
2. **Активация** — Пульсар даёт хаотичный выброс; частицы **пересекают** грид.  
3. **Заполнение** — Частицы попадают в плитки; разные плитки → разные паттерны (вихрь, линия, спираль).  
4. **Результат** — Вместо хаоса — **узор**, продиктованный геометрией сетки: **форма из шума**. Пульсар = шум, сетка = форма.

**Подсказка к коду:** `tileId` из `floor(x/tileW)`, `floor(y/tileH)` → таблица правил (силы, lifetime, модификаторы спавна). Пульсар задаёт только стартовые `(x,y,v,type)`.

---

## Связь частей (A / B / C — кратко / short bridge)

| | English | Русский |
| :--- | :--- | :--- |
| **Card (Part A)** | Rich **presentation layer**: soup video, warped grid, particle burst, gyro — “Higgs” **metaphor**. | Богатый **визуальный слой**: суп, сетка, вспышка частицы, гиро — **метафора** поля. |
| **Demo (Part B)** | **Narrative spine** for code: same emotional arc (noise → form → READY → dissolve) with **minimal** UI. | **Сюжетный каркас** для кода: тот же арка (шум → форма → READY → раствор), **минимум** интерфейса. |
| **Architecture (Part C)** | **Fractal logic:** global **grid** (outer rules per tile) + **Pulsar** (entropy source) + **micro-contexts** (local ensembles). Noise meets scaffold → emergent form. | **Фрактальная логика:** глобальная **сетка** + **Пульсар** (энтропия) + **микро-контексты** плиток. Шум + каркас → форма. |
| **Emergence (Part A §3)** | **Observer’s breath:** tile **resonance** → macro-beat; slow **scale + bloom** (~4–6 s); gyro/tap **arrhythmia**; three **time scales** (micro / meso / macro). | **Дыхание наблюдателя:** резонанс плиток → макро-пульс; медленное дыхание слоёв; три шкалы времени; наблюдатель в контуре. |
| **Together** | A = visuals + **breath**; B = time loop; C = **simulation shape** (how to code rules without spaghetti). | A = оболочка + **дыхание**; B = время; C = **форма симуляции** (как кодить правила иерархично). |
| **Bridge (Part D)** | **Inter-grid** future: **non-traceable** cross-grid transfer; singleton grids today; **opaque** boundary payloads — no global particle passport. | **Мост:** перенос **состояния** без тождества частиц; синглтон сейчас; порты на вырост. |
| **Phase v4.4 (Part E)** | **Particle = phase + role**; `state = f(seed, t + phaseOffset, role)`; derived: position, velocity, alpha, size; **orchestrate phase**, not objects. | **Частица = фаза + роль**; нет «паспорта»; всё — **раскрытие из выравнивания фазы**. |

---

## Implementation order (dependency stack — for Cursor)

**Principle:** hard geometry **(L2 grid)** → soft dynamics **(particles / Pulsar)** → emergent state **(breath / resonance)**. Do not invert.

| Step | What | First in repo? |
| :--- | :--- | :--- |
| **B** | **HTML + Pixi scaffold:** `CONFIG`, tile array (bounds + `resonanceMeter`), `HiggsField` / uniforms (`uTime`, `uMacroPhase`, `uResonance`, `uSpread`), grid drawn with **Gaussian warp** (CPU mesh first is OK). | **Yes — ship this before heavy particle logic.** |
| **A** | **GLSL vertex displacement** for the same Gaussian on a **Mesh** (move warp off CPU when stable). | After B works visually. |
| **C** | **Pulsar → tile:** particle `tileId`, rules per tile, resonance sync across neighbors. | After grid + uniforms are fixed. |

**Answer to “A vs B vs C first?”:** **B** lands in local context first (one file, one loop). **A** is a drop-in for the grid pass. **C** is the simulation layer on top.

**Русский:** Порядок **жёсткая геометрия (сетка) → мягкая динамика (частицы) → эмерджентность (дыхание)**. Сначала **B** — скелет в `card-field-birth-v2.html` (тайлы, `HiggsField`, гаусс на CPU, uniforms). Потом **A** — GLSL для Mesh. Потом **C** — Пульсар и `tileId`.

---

# Part D — Inter-Grid Bridge (multiverse scalability — spec only)

> **Format:** technical depth in **English**; vibe and metaphor in **Русский**.

## English

### D.1 Singleton grid (current scope)

We ship **one** `Grid` / `HiggsField` instance as a **self-contained universe**: tiles, Pulsar (later), resonance, observer breath. That is the **stable baseline** — no multi-world runtime required for the card MVP.

### D.2 The Bridge (future)

When scaling to **multiple grids** (parallel worlds, chapters, or split simulations), **Bridges** appear: **short, specialized transition zones** between grid singletons. A Bridge is **not** a large shared buffer; it is a **narrow lens** with an explicit I/O contract.

### D.3 Non-traceable transmission (core rule)

Crossing Grid A → Grid B through a Bridge:

| Rule | Meaning |
| :--- | :--- |
| **No cross-grid identity** | You **cannot** (and **should not**) assert that “particle *i* in A” is the **same** entity as “particle *j* in B”. Global particle IDs **do not** survive the crossing as stable handles. |
| **State transfer, not passport** | What crosses is **information**: energy, momentum, phase, optional **type** tag — carried as an **opaque payload** under a **protocol**, not as a persistent object reference. |
| **Observer sees process** | The user sees **transfer** — continuity of **field dynamics** — not a traceable “passport” of an individual token. |

**Newton’s cradle analogy:** impulse propagates through the chain; the physical balls are not meaningfully “the same” token across the cradle as an **identity-carrying** entity — only the **signal** is conserved in a useful sense.

### D.4 Coding contract (for Cursor — today)

- Write the **singleton** grid **cleanly**: simulation state is **owned** by one runtime instance.
- Particle indices are **local** to that instance (`localIndex` / pool slot). If you need a key, use **`(gridInstanceId, localIndex)`** only **inside** tooling — never assume that key maps across grids without an explicit Bridge remap.
- **Reserve** boundary affordances (names only): e.g. `emitAlongEdge`, `absorbAlongEdge`, **opaque** structs for what leaves/enters — **no** hard dependency on global UUIDs for particles.
- **Do not implement** Bridge simulation until explicitly scoped; **do** avoid architectural choices that **forbid** ports later (e.g. don’t bake “one true global particle table” for the whole multiverse).

---

## Русский

### Межсеточный мост (The Inter-Grid Bridge) — задел в «память»

1. **Синглтон-сетка (сейчас):** мы строим **один** грид как **самодостаточную вселенную** — база для частиц, пульсаров, резонансов. Это и есть стабильный мир карточки.

2. **Сущность моста (потом):** когда появятся **другие** гриды, между ними возникает **Мост** — короткая, но **особая** зона перехода: не склад общих данных, а **узкая линза**.

3. **Принцип неопределённости переноса:** при переходе через мост **нельзя** (и **не нужно**) отслеживать, что «частица А» из грида 1 — **та же самая** сущность, что «частица B» в гриде 2. Есть **передача энергии/состояния**, а **индивидуальность** как «паспорт» стирается. Наблюдатель видит **процесс** и **динамику поля**, а не досье на частицу. Близкая картинка — **колыбель Ньютона**: импульс передаётся, носители остаются **в своих** системах или становятся **неразличимы** в смысле тождества.

4. **Задел:** код пишем как **чистый синглтон**; у частиц **нет** жёстких глобальных ID, которые **невозможно** передать через мост. Держим в голове **порты ввода-вывода** на краях грида — как **чёрный ход** для будущих соединений, без реализации моста в MVP.

**Зафиксировано:** карточка — **изолированный стабильный мир**; архитектура не закрывает дверь на **мультиверс** и **миграции без истории**, с сохранением **динамики поля**.

---

# Part E — Matrix v4.4: Phase-Centered Particle System

> **Core insight:** **Particle = phase + role** — not position, not identity, not object. **Phase is the heart**; everything else is a **projection**.

## English

### E.1 Deterministic core

\[
\text{state} = f(\text{seed},\; t + \text{phaseOffset},\; \text{role})
\]

| Symbol | Role |
| :--- | :--- |
| `seed` | World consistency (reproducible field) |
| `t` | Global time, typically normalized \( \in [0,1] \) on the macro loop |
| `phaseOffset` | **Individuality** without persistent ID |
| `role` | Behavior pattern: e.g. core / dust / tracer / flare |

### E.2 Minimal particle record (authoritative)

Stored or stable inputs:

- `phaseOffset`
- `role`
- `energy`

**Derived each frame** (no duplicate state store):

- position, velocity, alpha, size — all from **phase + role curves**

→ Aligns with **Part D**: no cross-grid passport; pool slots are **implementation**, not ontology.

### E.3 Local phase and lifecycle

\[
\text{localPhase} = t + \text{phaseOffset}
\]

- **Phase** drives lifecycle: birth → form → **READY** → dissolve.  
- **Role** warps the response curve (same phase axis, different “instrumentation”).

### E.4 System layers (stack)

| Layer | Name | Job |
| :--- | :--- | :--- |
| 1 | **Pulsar** | Entropy source — **phase-distributed** excitations |
| 2 | **Grid** | Rules — maps phase into **structure** (tiles, resonance) |
| 3 | **Particles** | Medium — behavior from **phase + role** only |
| 4 | **Breath** | Emergence — global resonance when phases **synchronize** |

### E.5 Visual / implementation truth

- We do **not** “spawn then move” in the OO sense: we **evaluate** visibility and motion from **aligned phase**.  
- **One** primary time axis (`t`); **one** evaluation family (`f`); avoid parallel ad-hoc timelines.

### E.6 Architectural rules (hard)

- No hard global particle IDs (see Part D).  
- No duplicated authoritative state (derive or die).  
- No layered hacks that hide a second clock.

### E.7 Definition of done (user-visible arc)

All **phase-driven**: noise → activation → form → stability (**READY**) → dissolution.

---

## Русский (коротко)

**Суть:** мы не «анимируем объекты» — мы **дирижируем фазой**. Визуал — это **раскрытие** при совпадении фаз, не склад спрайтов с историей. Это тот же **тёплый MVP**, что и завтрак: мало ингредиентов, одна ось времени, всё остальное — вкус и тайминг.

---

## Review snapshot (why this doc works as a “project bible”)

- **Gaussian \(Z_{\text{offset}}\)** — fixed reference for grid warp shaders (no random deformation).  
- **L0–L4 + Screen / Add** — blend stack is explicit; less compositing chaos.  
- **Minimal demo (Part B)** — noise → wave → assembly → **READY** in 3–5s; engine depth stays internal.  
- **v1.1:** color HEX lock, FPS/particle budget, **gyro must ship** for the card wow.  
- **v1.2 (Part C):** **Grid + Pulsar + micro-contexts** — fractal hierarchy for code: global tile rules, chaotic emitter, local ensembles.  
- **v1.3:** **Observer’s breath** — emergence, resonance trigger, macro rhythm (~4–6 s), three temporal scales, observer feedback (gyro / tap).  
- **v1.4:** **Implementation order** — B → A → C (grid scaffold before Pulsar→tile).  
- **v1.5 (Part D):** **Inter-Grid Bridge** — non-traceable transmission; singleton-first code; boundary ports for future scaling.  
- **v1.6 (Part E):** **Matrix v4.4** — phase-centered particles; `state = f(seed, t + phaseOffset, role)`; layers Pulsar → Grid → Particles → Breath; DoD arc purely phase-driven.

---

*Version 1.6 · local Cursor context · `public/woodland/static/`*
