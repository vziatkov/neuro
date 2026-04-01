import "dotenv/config";

import { Bot, Context, InlineKeyboard } from "grammy";
import { Menu } from "@grammyjs/menu";

type UserRecord = {
  id: number;
  username: string | undefined;
  firstName: string;
  lastSeenAt: number;
};

const BOT_TOKEN = process.env.BOT_TOKEN;
const WEBAPP_URL = process.env.WEBAPP_URL ?? "https://example.com/telegram-webapp";

if (!BOT_TOKEN) {
  throw new Error("Missing BOT_TOKEN in environment.");
}

const bot = new Bot(BOT_TOKEN);
const users = new Map<number, UserRecord>();

function rememberUser(ctx: Context): void {
  const user = ctx.from;
  if (!user) {
    return;
  }

  const record: UserRecord = {
    id: user.id,
    username: user.username,
    firstName: user.first_name,
    lastSeenAt: Date.now(),
  };
  users.set(user.id, record);
  console.log(
    `[user] id=${record.id} username=${record.username ?? "-"} firstName=${record.firstName} seen=${new Date(
      record.lastSeenAt,
    ).toISOString()}`,
  );
}

function openCasinoKeyboard(): InlineKeyboard {
  return new InlineKeyboard().webApp("Open Casino", WEBAPP_URL);
}

const quickMenu = new Menu("main-menu")
  .text("🎯 Tournament", async (ctx) => {
    await ctx.reply("Tournament queue is warming up. Use /tournament for details.");
  })
  .row()
  .text("🎲 Join", async (ctx) => {
    await ctx.reply("Use /join to get your room link.");
  });

bot.use(async (ctx, next) => {
  rememberUser(ctx);
  await next();
});

bot.use(quickMenu);

bot.command("start", async (ctx) => {
  await ctx.reply(
    [
      "Welcome to Casino Oboz MVP.",
      "Tap the button below to open Telegram WebApp.",
      "",
      "Available commands:",
      "/tournament",
      "/join",
    ].join("\n"),
    {
      reply_markup: openCasinoKeyboard(),
    },
  );
});

bot.command("tournament", async (ctx) => {
  await ctx.reply(
    [
      "Tournament mode (Step 1 placeholder).",
      "Soon: room matching + round schedule.",
      `Tracked users in memory: ${users.size}`,
    ].join("\n"),
  );
});

bot.command("join", async (ctx) => {
  const room = `room_${ctx.from?.id ?? "guest"}`;
  await ctx.reply(
    [
      "Join flow (Step 1 placeholder).",
      `Suggested room: ${room}`,
      "Open Casino button can be used to enter the WebApp.",
    ].join("\n"),
    {
      reply_markup: openCasinoKeyboard(),
    },
  );
});

bot.catch((err) => {
  console.error("[bot.error]", err.error);
});

bot.start({
  onStart(botInfo) {
    console.log(`[bot] started as @${botInfo.username}`);
    console.log(`[bot] webapp url: ${WEBAPP_URL}`);
  },
});
