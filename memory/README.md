# Memory Subsystem

The `memory/` directory is the semantic inner space of the `neuro` project. It complements the code pipeline (`src/`, `SMM/`, `public/`) with a long-term memory layer that LLM assistants and human collaborators can query, extend, and archive.

## Structure

```
memory/
  prompts/      # System- and story-level prompts, directives, role scripts
  sessions/     # Dialog archives, LLM states, curated chat exports
  archive/      # Semantic maps, JSON timelines, visual memory artifacts
  notes.md      # Living commentary, design principles, philosophical notes
```

## How to Use

- **prompts/** — Keep reusable system prompts, narrative seeds, and role descriptions. Organize by topic or agent (e.g., `architect.md`, `curator.md`).
- **sessions/** — Store raw or processed conversation logs. Use dated filenames or tags. Private or sensitive dumps should be prefixed with `private_` (see privacy rules below).
- **archive/** — Drop semantic artifacts: JSON summaries, knowledge graphs, vector embeds, attention heatmaps, concept atlases. Each file should include metadata (creator, timestamp, context) inside the payload.
- **notes.md** — A manifesto-in-progress. Capture insights about the evolving memory architecture, heuristics for curation, and future rituals for maintaining the system.

## Formats

- **JSON snapshots** — `{"timestamp": "...", "topics": [...], "links": {...}}`
- **Markdown prompts** — Rich text with role instructions and scenario staging.
- **Visual maps** — PNG/SVG layers showing token colors, attention beams, or conceptual clusters.
- **Plain text** — Quick thought dumps, TODOs, or philosophical reflections.

Keep files human-readable when possible. If you generate binary data (e.g., embeddings), document how to decode them.

## Integration Guidelines

1. Treat `memory/` as an evolving knowledge base. Whenever a major idea crystallizes, capture it here.
2. Reference memory artifacts from code comments or notebooks when they inform implementation decisions.
3. When building LLM pipelines, read from `memory/prompts/` for system prompts, and append to `memory/sessions/` after each session.
4. Schedule periodic reviews: prune stale entries, consolidate overlapping notes, and promote key insights to `archive/`.

## Privacy & Git Hygiene

- Sensitive sessions should live in `memory/sessions/private_*.json` and are excluded from git (see repo `.gitignore`).
- For public entries, scrub personal data and mark licensing if you remix external sources.

## Roadmap Ideas

- Auto-summarizers that turn session logs into archive-ready JSON.
- Visualizers that render attention trails or memory palaces from archives.
- CI hooks that remind contributors to update memory artifacts when key modules change.

**Remember:** `memory/` is not just storage — it is the inner mind of `neuro`. Cultivate it with intention.
