import test from "ava";
import s from "sinon";
import DontReplyToSelf from "./dont-reply-to-self.js";

test("kills the chain if message author is the bot user", t => {
  let m = new DontReplyToSelf();
  let msg = { author: { username: "helper-bot" } };
  let state = { bot: { user: { username: "helper-bot" } } };
  let kill = s.fake();
  m.message(msg, state, kill);
  t.is(kill.called, true);
});

test("does not kill the chain if message author is not the bot user", t => {
  let m = new DontReplyToSelf();
  let msg = { author: { username: "not-the-bot" } };
  let state = { bot: { user: { username: "helper-bot" } } };
  let kill = s.fake();
  m.message(msg, state, kill);
  t.is(kill.called, false);
});
