const HelperBot = require("./src/helper-bot");

const DevChannels = require("./src/middleware/dev-channels");
const DontReplyToSelf = require("./src/middleware/dont-reply-to-self");
const Responder = require("./src/middleware/responder");

const helper = new HelperBot(process.env.DISCORD_BOT_TOKEN);

helper
  .use(new DevChannels(["shitty-bots"]))
  .use(new DontReplyToSelf())
  .use(
    new Responder({
      command: "/lazy",
      response: "is very lazy",
    }),
  )
  .use(
    new Responder({
      command: "/approve",
      response: "ᶘ ◕ᴥ◕ᶅ,b  I approve",
    }),
  )
  .use(
    new Responder({
      command: "/help",
      response: msg => {
        msg.reply("maybe " + helper.bot.users.random() + " can help you?");
      },
    }),
  )
  .start();
