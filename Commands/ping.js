module.exports = {
  name: "ping",
  description: "Test to see if the bot is online.",
  execute(message, args) {
    message.channel.send("pong");
  },
};
