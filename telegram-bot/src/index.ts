import "dotenv/config";

import { Bot, Context, InlineKeyboard } from "grammy";
import { Menu } from "@grammyjs/menu";
import { randomUUID } from "node:crypto";

type UserRecord = {
  id: number;
  username: string | undefined;
  firstName: string;
  lastSeenAt: number;
};

type Tournament = {
  id: string;
  hostId: number;
  players: number[];
  createdAt: number;
};

const BOT_TOKEN = process.env.BOT_TOKEN;
const WEBAPP_URL = process.env.WEBAPP_URL ?? "https://example.com/telegram-webapp";

if (!BOT_TOKEN) {
  throw new Error("Missing BOT_TOKEN in environment.");
}

const bot = new Bot(BOT_TOKEN);
const users = new Map<number, UserRecord>();
const tournaments = new Map<string, Tournament>();
let currentTournamentId: string | null = null;

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

function openCasinoRoomKeyboard(tournamentId: string): InlineKeyboard {
  const roomUrl = `${WEBAPP_URL}?room=${encodeURIComponent(tournamentId)}`;
  return new InlineKeyboard()
    .webApp("Open Casino", roomUrl)
    .text("Join Tournament", `join_tournament:${tournamentId}`);
}

function buildTournamentId(): string {
  return randomUUID().replace(/-/g, "").slice(0, 6);
}

function getCurrentTournament(): Tournament | null {
  if (!currentTournamentId) {
    return null;
  }

  return tournaments.get(currentTournamentId) ?? null;
}

function addPlayerToTournament(tournament: Tournament, userId: number): { joined: boolean; count: number } {
  if (tournament.players.includes(userId)) {
    return { joined: false, count: tournament.players.length };
  }
  tournament.players.push(userId);
  return { joined: true, count: tournament.players.length };
}

function formatPlayerLabel(userId: number, index: number): string {
  const user = users.get(userId);
  const usernamePart = user?.username ? `@${user.username}` : "no-username";
  const firstNamePart = user?.firstName ?? "unknown";
  return `${index + 1}. ${firstNamePart} (${usernamePart}) [${userId}]`;
}

const quickMenu = new Menu("main-menu")
  .text("🎯 Tournament", async (ctx) => {
    await ctx.reply("Use /tournament to create a room.");
  })
  .row()
  .text("🎲 Join", async (ctx) => {
    await ctx.reply("Use /join to join the latest tournament.");
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
      "/players",
    ].join("\n"),
    {
      reply_markup: openCasinoKeyboard(),
    },
  );
});

bot.command("tournament", async (ctx) => {
  const hostId = ctx.from?.id;
  if (!hostId) {
    await ctx.reply("Cannot create tournament: user is unknown.");
    return;
  }

  const tournamentId = buildTournamentId();
  const tournament: Tournament = {
    id: tournamentId,
    hostId,
    players: [hostId],
    createdAt: Date.now(),
  };
  tournaments.set(tournamentId, tournament);
  currentTournamentId = tournamentId;
  console.log(`[tournament] created id=${tournamentId} hostId=${hostId}`);

  await ctx.reply(
    [
      "Tournament created",
      `ID: ${tournamentId}`,
      "Host assigned",
    ].join("\n"),
    {
      reply_markup: openCasinoRoomKeyboard(tournamentId),
    },
  );
});

bot.command("join", async (ctx) => {
  const userId = ctx.from?.id;
  if (!userId) {
    await ctx.reply("Cannot join tournament: user is unknown.");
    return;
  }

  const tournament = getCurrentTournament();
  if (!tournament) {
    await ctx.reply("No active tournament. Use /tournament first.");
    return;
  }

  const result = addPlayerToTournament(tournament, userId);
  if (result.joined) {
    console.log(`[tournament] join id=${tournament.id} userId=${userId} players=${result.count}`);
  } else {
    console.log(`[tournament] duplicate_join id=${tournament.id} userId=${userId} players=${result.count}`);
  }

  await ctx.reply(
    [
      `Joined tournament (${result.count} players)`,
      `ID: ${tournament.id}`,
    ].join("\n"),
    {
      reply_markup: openCasinoRoomKeyboard(tournament.id),
    },
  );
});

bot.command("players", async (ctx) => {
  const tournament = getCurrentTournament();
  if (!tournament) {
    await ctx.reply("No active tournament. Use /tournament first.");
    return;
  }

  const lines = tournament.players.map((id, index) => formatPlayerLabel(id, index));
  await ctx.reply(
    [
      `Tournament ${tournament.id}`,
      `Players: ${tournament.players.length}`,
      ...lines,
    ].join("\n"),
  );
});

bot.callbackQuery(/^join_tournament:(.+)$/i, async (ctx) => {
  const userId = ctx.from?.id;
  const tournamentId = ctx.match[1];
  if (!tournamentId) {
    await ctx.answerCallbackQuery({ text: "Tournament id is missing", show_alert: true });
    return;
  }
  const tournament = tournaments.get(tournamentId);

  if (!userId) {
    await ctx.answerCallbackQuery({ text: "User is unknown", show_alert: true });
    return;
  }
  if (!tournament) {
    await ctx.answerCallbackQuery({ text: "Tournament not found", show_alert: true });
    return;
  }

  currentTournamentId = tournament.id;
  const result = addPlayerToTournament(tournament, userId);
  if (result.joined) {
    console.log(`[tournament] join id=${tournament.id} userId=${userId} players=${result.count}`);
  } else {
    console.log(`[tournament] duplicate_join id=${tournament.id} userId=${userId} players=${result.count}`);
  }

  await ctx.answerCallbackQuery({ text: "Joined tournament" });
  await ctx.reply(
    [
      `Joined tournament (${result.count} players)`,
      `ID: ${tournament.id}`,
    ].join("\n"),
    {
      reply_markup: openCasinoRoomKeyboard(tournament.id),
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
