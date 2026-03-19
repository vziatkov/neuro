<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/6c42769b-0968-4b66-8e2b-8bcf2227853d

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Woodland demos (Pixi) in `dist/`

`npm run build` copies **[`../../public/woodland`](../../public/woodland)** into **`dist/woodland/`** (hub, `try5a`, `try4`, PDFs). Deploy the whole **`dist/`** folder: open **`woodland/index.html`** next to the single-file storybook — **no separate localhost** for the Matrix pages.

- From the storybook UI: header link **“Matrix demos & PDFs”** → `./woodland/index.html`.
- Source of truth for HTML/PDFs stays in the repo root `public/woodland/` (single copy, no drift).
