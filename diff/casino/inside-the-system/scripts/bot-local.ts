import 'dotenv/config';
import { Markup, Telegraf } from 'telegraf';

const botToken = process.env.BOT_TOKEN;

if (!botToken) {
  throw new Error('BOT_TOKEN is missing. Set it in .env');
}

const appUrl =
  process.env.BOT_APP_URL ||
  'http://localhost:3000/neuro/diff/casino/inside-the-system/dist/';
const botName = process.env.BOT_NAME || 'Casino Local Bot';

const bot = new Telegraf(botToken);

bot.start(async (ctx) => {
  await ctx.reply(
    `${botName} is online.\n/ping — check connection.\n/comment <text> — first bot comment.`,
    Markup.inlineKeyboard([
      Markup.button.url('Open Casino', appUrl),
      Markup.button.callback('Send Demo Comment', 'send_demo_comment'),
    ]),
  );
});

bot.command('ping', async (ctx) => {
  await ctx.reply('pong');
});

bot.command('comment', async (ctx) => {
  const text = ctx.message.text.replace(/^\/comment(@\w+)?\s*/i, '').trim();

  if (!text) {
    await ctx.reply('Usage: /comment Your first comment');
    return;
  }

  await ctx.reply(`Bot comment: ${text}`);
});

bot.action('send_demo_comment', async (ctx) => {
  await ctx.answerCbQuery();
  await ctx.reply('Bot comment: first local test message is delivered.');
});

bot.launch();
console.log('Telegram bot started in polling mode.');

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

