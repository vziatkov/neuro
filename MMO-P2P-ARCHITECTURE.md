# P2P MMO без серверов — рабочая схема

Референс для **mmo-map.html**: deterministic world `World = f(seed, x, y)`, передаём только позиции игроков. Serverless.

---

## 1. Основная идея

- Карту **не передаём** — все генерируют по seed.
- **Deterministic generation** гарантирует, что все пиры видят одинаковый террейн без синхронизации данных карты.
- По сети только: `peerId`, `x`, `y`, `dir`, `timestamp`.

---

## 2. Архитектура: temporary host election (не pure mesh)

```
        HOST (relay + peer registry)
      /  |  \
     A   B   C
          |
          D
```

- Host = relay + реестр пиров. Хост **временный** и может мигрировать при отключении текущего хоста. Мир у всех один и тот же (seed).
- Первый, кто нажал **Host**, становится master. Остальные **Join(room)**. Host отдаёт список peers.

---

## 3. WebRTC

- `RTCPeerConnection({ iceServers: [{ urls: "stun:stun.l.google.com:19302" }] })`. **STUN only** — в большинстве NAT даёт прямой P2P. **TURN** опционален при жёстком NAT.
- DataChannel: `{ t: "pos", id, x, y }` — JSON.

---

## 4. Обновление позиции

- **10 Hz**: каждые 100 ms `broadcast({ t: "pos", x, y })`.

---

## 5. Карта пиров

```js
peers = { id1: { x, y, lastSeen }, id2: { x, y, lastSeen } }
```

- Удалять, если `now - lastSeen > 5s`.

---

## 6. Ссылка мира

```
/mmo-map.html?seed=world&room=alpha
```

- Один URL = один мир + одна комната. Кто открыл — попал в тот же мир.

---

## 7. Локальная vector DB (не для карты)

Для **memory мира**:

- visited tiles, ghost trails игроков, npc memory, events, objects.
- Варианты: LanceDB WASM, DuckDB WASM, SQLite WASM.
- Пример записи: `{ type: "player-trace", x, y, peer, time }`.

---

## 8. Фичи

- **Mini radar**: ● you, ○ peers.
- **Ghost trails**: следы игроков из vector DB → визуальный путь → shared memory world.

---

## 9. Следующий уровень

**Serverless MMO на ~100 игроков**: трюк — **spatial shards** — пиры ретранслируют обновления только внутри ближайших пространственных ячеек. Архитектура уровня No Man's Sky, 100% browser, 0 серверов.

---

*Текущая реализация: mmo-map.html — Host/Join через PeerJS, синхронизация позиций по data channel. Room = seed из URL.*
