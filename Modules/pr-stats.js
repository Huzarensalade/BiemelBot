const PR_Schema = require("../DB-Schemas/pr-schema");

module.exports.createProfile = async (interaction) => {
  const userID = interaction.user.id;

  await interaction.deferReply({ ephemeral: true });

  await new PR_Schema({
    userID: userID,
  }).save();

  await interaction.editReply({
    content: "Profiel aangemaakt",
    ephemeral: true,
  });
};
