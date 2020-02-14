class DevChannels {
  constructor(devChannels) {
    this.devChannels = devChannels;
    this.message = this.message.bind(this);
  }

  message(msg, state) {
    if (this.devChannels.includes(msg.channel.name)) {
      state.devChannel = true;
    }
  }
}

module.exports = DevChannels;
