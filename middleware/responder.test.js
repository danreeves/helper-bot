import test from "ava";
import s from "sinon";
import Responder from "./responder.js";

test("it calls msg.reply if the msg.content matches (string)", t => {
  let m = new Responder({
    command: "ping",
    response: "pong"
  });

  let msg = {
    content: "ping",
    reply: s.fake()
  };

  m.message(msg);

  t.is(msg.reply.called, true);
  t.is(msg.reply.lastArg, "pong");
});

test("it calls msg.reply if the msg.content matches (regex)", t => {
  let m = new Responder({
    command: /ping/,
    response: "pong"
  });

  let msg = {
    content: "ping",
    reply: s.fake()
  };

  m.message(msg);

  t.is(msg.reply.called, true);
  t.is(msg.reply.lastArg, "pong");
});

test("it calls response if it is a function", t => {
  let response = s.fake();
  let m = new Responder({
    command: "ping",
    response
  });

  let msg = {
    content: "ping",
    reply: () => {}
  };

  m.message(msg);

  t.is(response.called, true);
  t.is(response.lastArg, msg);
});
