import test from "ava";
import { Client } from "discord.js";
import HelperBot from "./index";

test("HelperBot assigns the discord client to this.bot", t => {
  const bot = new HelperBot("password");
  t.true(bot.bot instanceof Client);
});

test("use pushes middleware into the middlewares array", t => {
  class Middleware1 {}
  class Middleware2 {}
  const bot = new HelperBot("password");

  bot.use(new Middleware1());
  t.is(bot.middlewares.length, 1);
  t.true(bot.middlewares[0] instanceof Middleware1);

  bot.use(new Middleware2());
  t.is(bot.middlewares.length, 2);
  t.true(bot.middlewares[0] instanceof Middleware1);
  t.true(bot.middlewares[1] instanceof Middleware2);
});

test("calling bot.message calls the message method on each middleware", t => {
  let calledFirst = false;
  let calledSecond = false;
  class Middleware1 {
    message() {
      calledFirst = true;
    }
  }
  class Middleware2 {
    message() {
      calledSecond = true;
    }
  }
  const bot = new HelperBot("pass");
  bot.use(new Middleware1()).use(new Middleware2());

  t.is(calledFirst, false);
  t.is(calledSecond, false);
  bot.message();
  t.is(calledFirst, true);
  t.is(calledSecond, true);
});

test("calling bot.voiceStateUpdate calls the voiceStateUpdate method on each middleware", t => {
  let calledFirst = false;
  let calledSecond = false;
  class Middleware1 {
    voiceStateUpdate() {
      calledFirst = true;
    }
  }
  class Middleware2 {
    voiceStateUpdate() {
      calledSecond = true;
    }
  }
  const bot = new HelperBot("pass");
  bot.use(new Middleware1()).use(new Middleware2());

  t.is(calledFirst, false);
  t.is(calledSecond, false);
  bot.voiceStateUpdate();
  t.is(calledFirst, true);
  t.is(calledSecond, true);
});

test("calling the kill argument will prevent any further middlewares being run", t => {
  let calledFirst = false;
  let calledSecond = false;
  class Middleware1 {
    message(msg, state, kill) {
      calledFirst = true;
      kill();
    }
  }
  class Middleware2 {
    message() {
      calledSecond = true;
    }
  }
  const bot = new HelperBot("pass");
  bot.use(new Middleware1()).use(new Middleware2());

  t.is(calledFirst, false);
  t.is(calledSecond, false);
  bot.message();
  t.is(calledFirst, true);
  t.is(calledSecond, false);
});

test("state is maintained between middleware calls", t => {
  t.fail(); // Add a proper mocking library like jest has
});
