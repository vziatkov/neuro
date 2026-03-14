# Agent API — как двигаться по карте (для браузерных агентов / Atlas)

Страница: **P2P MMO Map** (`mmo-map.html`). В консоли доступен глобальный объект `AgentAPI`.

---

## Быстрый старт

Открой консоль (F12 → Console) на странице карты и вставляй команды.

### Просто двигаться вправо
```javascript
setInterval(() => AgentAPI.move(1, 0), 70)
```
(Интервал ≥60 мс — иначе `move` игнорируется из‑за cooldown.)

### Остановить движение
```javascript
clearInterval(/* тот id, что вернул setInterval */)
```
Или перезагрузи страницу.

---

## API

| Метод | Описание |
|-------|----------|
| `AgentAPI.move(dx, dy)` | Сдвиг на `dx`, `dy` (в единицах ~0.5 тайла). Возвращает `true` если ход принят, `false` если ещё cooldown. Cooldown **60 мс**. |
| `AgentAPI.state()` | `{ x, y, score, temples }` — позиция игрока, счёт, число открытых храмов. |
| `AgentAPI.scan(radius)` | Массив ячеек в квадрате вокруг игрока (radius 1…20). У каждой ячейки: `x`, `y`, `terrain`, `resource`, `temple`, `portal`, `collected`. |
| `AgentAPI.scanTile(x, y)` | Одна ячейка в мировых координатах — для pathfinding. |
| `AgentAPI.world()` | `{ seed, tileSize }` — seed мира и размер тайла. |

---

## Пример: идти к ближайшему ресурсу, иначе — вправо

```javascript
setInterval(() => {
  const state = AgentAPI.state()
  const cells = AgentAPI.scan(5)
  const res = cells.find(c => c.resource)
  if (!res) {
    AgentAPI.move(1, 0)
    return
  }
  const dx = Math.sign(res.x - state.x)
  const dy = Math.sign(res.y - state.y)
  if (dx !== 0 || dy !== 0) AgentAPI.move(dx, dy)
}, 70)
```

---

## Пример: идти к храму (temple)

```javascript
setInterval(() => {
  const state = AgentAPI.state()
  const cells = AgentAPI.scan(8)
  const temple = cells.find(c => c.temple)
  if (!temple) {
    AgentAPI.move(1, 0)  // explore
    return
  }
  const dx = Math.sign(temple.x - state.x)
  const dy = Math.sign(temple.y - state.y)
  if (dx !== 0 || dy !== 0) AgentAPI.move(dx, dy)
}, 70)
```

---

## Пример: один шаг по направлению к цели (для своего цикла)

```javascript
function stepToward(targetX, targetY) {
  const state = AgentAPI.state()
  const dx = Math.sign(targetX - state.x)
  const dy = Math.sign(targetY - state.y)
  if (dx !== 0 || dy !== 0) AgentAPI.move(dx, dy)
}
// вызов раз в 70ms из своего setInterval/requestAnimationFrame
```

---

## Terrain

- `terrain`: `'water'` | `'sand'` | `'grass'` | `'mountain'`
- По воде/горам лучше не ходить — используй `scanTile(x,y).terrain` перед шагом.

---

## Для Atlas / браузерного агента

1. Открой страницу карты (тот же URL с seed, если нужен общий мир).
2. В консоли или через внедрение скрипта вызывай только `AgentAPI.*` — всё уже на странице.
3. Движение: вызывай `AgentAPI.move(dx, dy)` не чаще чем раз в **60 мс** (лучше 70).
4. Решения принимай по `state()` и `scan()` / `scanTile()`; затем вызывай один `move(dx, dy)` за тик.

Готовый цикл «собирать ресурсы, иначе идти к храму, иначе вправо»:

```javascript
const tick = () => {
  const state = AgentAPI.state()
  const cells = AgentAPI.scan(6)
  const res = cells.find(c => c.resource)
  const temple = cells.find(c => c.temple)
  let dx = 1, dy = 0
  if (res) { dx = Math.sign(res.x - state.x); dy = Math.sign(res.y - state.y) }
  else if (temple) { dx = Math.sign(temple.x - state.x); dy = Math.sign(temple.y - state.y) }
  if (dx !== 0 || dy !== 0) AgentAPI.move(dx, dy)
}
setInterval(tick, 70)
```

Чтобы остановить: сохрани id и вызови `clearInterval(id)`.
