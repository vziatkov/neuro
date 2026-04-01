# Telegram Bot — Step 1 (grammY)

Minimal Telegram bot for Casino Oboz MVP.

## Features

- `/start` command with inline **Open Casino** WebApp button
- `/tournament` command
- `/join` command
- In-memory user registry (`Map`)
- Console logging for `user.id` and `username`

## Setup

1. Copy env file:

   - `cp .env.example .env`

2. Fill `.env`:

   - `BOT_TOKEN=...` from BotFather
   - `WEBAPP_URL=https://example.com/telegram-webapp` (placeholder for now)

3. Install:

   - `npm install`

4. Run dev:

   - `npm run dev`

5. Or build + run:

   - `npm run build`
   - `npm start`

