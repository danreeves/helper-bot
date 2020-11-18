import test from "ava";
import s from "sinon";
import Responder from "./responder";

test("it calls msg.reply if the msg.content matches (string)", t => {
  const m = new Responder({
    command: "ping",
    response: "pong"
  });

  const msg = {
    content: "ping",
    reply: s.fake()
  };

  m.message(msg);

  t.is(msg.reply.called, true);
  t.is(msg.reply.lastArg, "pong");
});

test("it calls msg.reply if the msg.content matches (regex)", t => {
  const m = new Responder({
    command: /ping/,
    response: "pong"
  });

  const msg = {
    content: "ping",
    reply: s.fake()
  };

  m.message(msg);

  t.is(msg.reply.called, true);
  t.is(msg.reply.lastArg, "pong");
});

test("it calls response if it is a function", t => {
  const response = s.fake();
  const m = new Responder({
    command: "ping",
    response
  });

  const msg = {
    content: "ping",
    reply: () => {}
  };

  m.message(msg);

  t.is(response.called, true);
  t.is(response.lastArg, msg);
});
