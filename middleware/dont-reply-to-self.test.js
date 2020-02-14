import test from "ava";
import s from "sinon";
import DontReplyToSelf from "./dont-reply-to-self";

test("kills the chain if message author is the bot user", t => {
  const m = new DontReplyToSelf();
  const msg = { author: { username: "helper-bot" } };
  const state = { bot: { user: { username: "helper-bot" } } };
  const kill = s.fake();
  m.message(msg, state, kill);
  t.is(kill.called, true);
});

test("does not kill the chain if message author is not the bot user", t => {
  const m = new DontReplyToSelf();
  const msg = { author: { username: "not-the-bot" } };
  const state = { bot: { user: { username: "helper-bot" } } };
  const kill = s.fake();
  m.message(msg, state, kill);
  t.is(kill.called, false);
});
