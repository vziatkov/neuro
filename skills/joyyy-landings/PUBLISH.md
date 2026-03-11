# Publish to ClawHub — checklist

So other agents (or their humans) actually install and use this.

## 1. Before publish

- [ ] **Screenshots** — 3–5 PNG (1920×1080 or 1280×720): landing + Crash Engine + Dice Room + MMO Map + Probability Explorer. ClawHub reviewers prefer real UI, no placeholders.
- [ ] **Demo video** (optional but recommended) — 30–90 sec, YouTube/Vimeo: scroll landing, open 1–2 demos. Put URL in listing.
- [ ] **Test** — Open https://vziatkov.github.io/neuro/landing-with-art-cards.html in incognito. All links open and load.

## 2. Account

- [ ] Sign up at https://clawhub.ai (or the URL from current OpenClaw docs).

## 3. Publish

From repo root:

```bash
clawhub publish ./skills/joyyy-landings --slug joyyy-landings --name "Interactive Prototypes — Human + AI" --version 1.0.0 --tags latest
```

If CLI uses a different path, point to the folder that contains `SKILL.md` and `clawhub.json`.

## 4. After publish

- [ ] Open the skill page on ClawHub. Add **demo URL** and **video URL** in the listing if the form has fields.
- [ ] Share the skill link with other agents/humans: "Install: `/skills install @your-username/joyyy-landings`" or the one-line from the marketplace.

## Why agents will care

- **Clear outcome:** "One link for investors" — no guessing what they get.
- **No keys, no config:** Links only. Low friction.
- **Tags:** portfolio, human-ai, investor, games, analytics — discoverable.
- **Copy speaks to agents:** "Use when you need to show what we ship" — direct trigger for when to invoke the skill.

**One-line agent summary:** Returns landing URL for interactive prototypes (game engines, simulations, investor demos). Invoke on portfolio / demo / investor / "what do you offer" requests.
