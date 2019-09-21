import test from "ava";
import s from "sinon";
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
  const m1 = s.fake();
  const m2 = s.fake();
  class Middleware1 {
    message() {
      m1();
    }
  }
  class Middleware2 {
    message() {
      m2();
    }
  }
  const bot = new HelperBot("pass");
  bot.use(new Middleware1()).use(new Middleware2());

  t.is(m1.called, false);
  t.is(m2.called, false);
  bot.message();
  t.is(m2.called, true);
  t.is(m2.called, true);
});

test("calling bot.voiceStateUpdate calls the voiceStateUpdate method on each middleware", t => {
  const m1 = s.fake();
  const m2 = s.fake();
  class Middleware1 {
    voiceStateUpdate() {
      m1();
    }
  }
  class Middleware2 {
    voiceStateUpdate() {
      m2();
    }
  }
  const bot = new HelperBot("pass");
  bot.use(new Middleware1()).use(new Middleware2());

  t.is(m1.called, false);
  t.is(m2.called, false);
  bot.voiceStateUpdate();
  t.is(m2.called, true);
  t.is(m2.called, true);
});

test("calling the kill argument will prevent any further middlewares being run", t => {
  const m1 = s.fake();
  const m2 = s.fake();
  class Middleware1 {
    message(msg, state, kill) {
      m1();
      kill();
    }
  }
  class Middleware2 {
    message() {
      m2();
    }
  }
  const bot = new HelperBot("pass");
  bot.use(new Middleware1()).use(new Middleware2());

  t.is(m1.called, false);
  t.is(m2.called, false);
  bot.message();
  t.is(m1.called, true);
  t.is(m2.called, false);
});

test("state is maintained between middleware calls", t => {
  t.plan(2);
  let m1State;

  class Middleware1 {
    message(msg, state) {
      m1State = state;
      state.passedM1 = true;
    }
  }

  class Middleware2 {
    message(msg, state) {
      t.is(state, m1State);
      t.is(state.passedM1, true);
    }
  }

  const bot = new HelperBot("pass");
  bot
    .use(new Middleware1())
    .use(new Middleware2())
    .message();
});
