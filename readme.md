# Helper Bot 🤖

A framework around [Discord.js](https://discord.js.org) for implementing simple bot behaviour in bite-sized chunks.

## The code

Check out `index.js` to see how it works ✨. It's really quite simple, so it might be better to read `example.js` and the provided middlewares to see how to use it.

# Usage

```js
const HelperBot = require('@danreeves/helper-bot')

const bot = new HelperBot(process.env.DISCORD_BOT_TOKEN)

bot.use(new Middleware())

bot.start()
```
