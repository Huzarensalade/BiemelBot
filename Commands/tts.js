const { SlashCommandBuilder } = require("discord.js");
const tts_module = require("../Modules/TextToSpeech");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("tts")
    .setDescription("Start Text To Speech Session."),
  async execute(interaction) {
    tts_module.startProcess(interaction);
  },
};
