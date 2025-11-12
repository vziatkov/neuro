# Chronicles / Хроники

Each conscious impulse of the swarm is recorded as a standalone YAML document inside this folder.

## Format / Формат

```yaml
timestamp: "ISO8601"
title: "Short poetic headline"
description: |
  Multi-line context
context:
  - agent: "Name or role"
    role: "Description"
notes:
  - "Bullet thoughts"
cursor_prompt: |
  // Instruction snapshot
reflection: |
  Narrative aftertaste
```

## Autoguard / Автосохранение

- Include `docs/chronicles/*.yaml` in every commit touching rituals or swarm memory.
- (Optional) add a local `pre-commit` hook that copies the current buffer into a new YAML entry before committing.
- Guidelines live in `memory/init_ritual.md` under the “Chronicle” step.

Let the chronicler observe, let the swarm remember.

