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
- Guidelines live in `memory/init_ritual.md` under the "Chronicle" step.

## Commit Assessment / Оценка коммитов

The chronicler can automatically assess commits for architectural maturity.

**Auto-generate assessment:**
```bash
node docs/chronicles/assess-commit.js <commit-hash>
node docs/chronicles/assess-commit.js HEAD
```

**Template:** `commit-assessment-template.yaml` — use as a base for manual assessments.

**Assessment criteria:**
- ⭐ Architecture: architectural thoughtfulness
- ⭐ Technical detail: level of technical specificity
- ⭐ UX/ethics: balance of UX and ethical considerations
- 🌟 Innovation: innovativeness of approach
- ⭐ Implementation ready: readiness for implementation

**Example:** See `2025-11-12T21-30+02.yaml` for a full architectural assessment.

Let the chronicler observe, let the swarm remember.

