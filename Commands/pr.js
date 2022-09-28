const { SlashCommandBuilder } = require("discord.js");
const pr_module = require("../Modules/pr-stats");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("pr")
    .setDescription("Acces the PR-stats module to view, add or delete PR's")
    .addSubcommand((subcommand) =>
      subcommand.setName("create").setDescription("Create a new PR Profile.")
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("delete").setDescription("Delete your PR Profile.")
    )
    ),
  execute(interaction) {
    switch (interaction.options.getSubcommand()) {
      case "create":
        pr_module.createProfile(interaction);
        break;
      case "delete":
        pr_module.deleteProfile(interaction);
        break;
    }
  },
};
