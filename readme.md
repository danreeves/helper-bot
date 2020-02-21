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

# API

## Constructor

```js
new HelperBot(DISCORD_BOT_TOKEN: string)
```

The constructor takes the Discord bot token as an argument and returns an instance.

## `.use`
```js
.use(middleware: HelperBotMiddleware)
```

Add a new middleware to the HelperBot instance. See the [Middleware API](#middleware)

## `.start`
```js
.start()
```

Logs the bot into Discord and begins listening for events.


## Middleware

A HelperBot middleware is an object that can implement any of the following methods:

### `userJoin`
```js
userJoin(guildMember, state, kill)
```
Called when a member joins a server.

See [Discord.js docs](https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildMemberAdd)

### `message`
```js
message(message, state, kill)
```
Called when a message is recieved.

See [Discord.js docs](https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-message)

### `reactionAdd`
```js
reactionAdd(reaction, user, state, kill)
```
Called when a reaction is added to a message.

See [Discord.js docs](https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-messageReactionAdd)

### `reactionRemove`
```js
reactionRemove(reaction, user, state, kill)
```
Called when a reaction is removed from a message.

See [Discord.js docs](https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-messageReactionRemove)

### `voiceStateUpdate`
```js
voiceStateUpdate(oldUser, newUser)
```
Called whenever a user changes voice state - e.g. joins/leaves a channel, mutes/unmutes.

See [Discord.js docs](https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-voiceStateUpdate)

### Common arguments

The last two arguments to a middleware method are always `state` and `kill`.

`state` is a mutable object that is passed to every middleware in the chain. This lets you pass state down to preceding middleware.

`kill` is a function that when called will end the middleware chain and prevent preceding middleware from being triggered.
