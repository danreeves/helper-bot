import test from "ava";
import DevChannels from "./dev-channels";

test("it sets state.devMode if msg.channel.name is in the dev channels provided", t => {
  const m = new DevChannels(["dev-channel"]);
  const state = {};

  m.message({ channel: { name: "general-chat" } }, state);
  t.deepEqual(state, {});

  m.message({ channel: { name: "dev-channel" } }, state);
  t.deepEqual(state, { devChannel: true });
});
