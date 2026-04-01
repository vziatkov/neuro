# Telegram Bot — Step 2 Lite (grammY)

Minimal Telegram bot for Casino Oboz MVP.

## Features

- `/start` command with inline **Open Casino** WebApp button
- `/tournament` creates a tournament room (`Map` state)
- `/join` adds user to latest tournament
- `/players` shows current tournament players
- In-memory user registry (`Map`)
- In-memory tournament registry (`Map`)
- Console logging for `user.id` and `username`

## Setup

1. Copy env file:

   - `cp .env.example .env`

2. Fill `.env`:

   - `BOT_TOKEN=...` from BotFather
   - `WEBAPP_URL=https://example.com/telegram-webapp` (placeholder or your webapp URL)

3. Install:

   - `npm install`

4. Run dev:

   - `npm run dev`

5. Or build + run:

   - `npm run build`
   - `npm start`

## Commands

- `/start` — intro + Open Casino button
- `/tournament` — create a new tournament and get a room button
- `/join` — join latest tournament
- `/players` — list players in latest tournament

