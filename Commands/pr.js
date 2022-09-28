const { SlashCommandBuilder } = require("discord.js");
const pr_module = require("../Modules/pr-stats");

//#region create PR Attribute list
const PR_Attributes = require("../DB-Schemas/pr-schema").schema.paths;
attributeList = Object.keys(PR_Attributes);
attributeList.splice(attributeList.length - 2, 2);
attributeList.shift();

const objectList = attributeList.map(function (element) {
  return { name: element, value: element };
});
//#endregion

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
    .addSubcommand((subcommand) =>
      subcommand
        .setName("add")
        .setDescription("Add or overwrite a new PR-record to your profile.")
        .addStringOption((option) =>
          option
            .setName("excercise")
            .setDescription(
              "The excercise you want to add or overwrite a PR for."
            )
            .addChoices(...objectList)
            .setRequired(true)
        )
        .addIntegerOption((option) =>
          option
            .setName("value")
            .setDescription("The amount of your PR in KG's")
            .setRequired(true)
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
      case "add":
        pr_module.addRecord(interaction);
        break;
    }
  },
};
