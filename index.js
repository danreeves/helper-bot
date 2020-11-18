const { Client } = require("discord.js");

class HelperBot {
	constructor(discordBotToken) {
		// Instance state
		this.bot = new Client();
		this.botToken = discordBotToken;
		this.middlewares = [];

		// Bound instance methods
		this.start = this.start.bind(this);
		this.use = this.use.bind(this);
		this.dispatcher = this.dispatcher.bind(this);

		// Bot event listeners
		this.bot.on("guildMemberAdd", this.dispatcher("userJoin"));
		this.bot.on("message", this.dispatcher("message"));
		this.bot.on("messageReactionAdd", this.dispatcher("reactionAdd"));
		this.bot.on("messageReactionRemove", this.dispatcher("reactionRemove"));
		this.bot.on("voiceStateUpdate", this.dispatcher("voiceStateUpdate"));
		this.bot.on("error", this.dispatcher("error"));
		this.bot.on("warn", this.dispatcher("warn"));
		this.bot.on("rateLimit", this.dispatcher("rateLimit"));

		this.bot.on("ready", () => {
			const initMiddleware = this.dispatcher("init");
			initMiddleware(this.bot);
		});
	}

	start() {
		this.bot.login(this.botToken);
	}

	use(middleware) {
		this.middlewares.push(middleware);
		return this;
	}

	dispatcher(eventName) {
		return (...args) => {
			const state = {
				bot: this.bot,
			};

			let shouldRun = true;

			function kill() {
				shouldRun = false;
			}

			this.middlewares.forEach(
				(mw) =>
					shouldRun && mw[eventName] && mw[eventName](...args, state, kill),
			);
		};
	}
}

module.exports = HelperBot;
