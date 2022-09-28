const PR_Schema = require("../DB-Schemas/pr-schema");

module.exports.createProfile = async (interaction) => {
  await interaction.deferReply({ ephemeral: true });

  const userID = interaction.user.id;
  const user = await PR_Schema.findOne({ userID: userID }).exec();

  if (user != null) {
    await interaction.editReply({
      content: "Deze gebruiker bestaat al",
      ephemeral: true,
    });
    return;
  }

  await new PR_Schema({
    userID: userID,
  }).save();

  await interaction.editReply({
    content: "Profiel aangemaakt",
    ephemeral: true,
  });
};
module.exports.deleteProfile = async (interaction) => {
  await interaction.deferReply({ ephemeral: true });

  const userID = interaction.user.id;
  const execute = await PR_Schema.findOneAndDelete({ userID: userID }).exec();

  if (execute != null) {
    await interaction.editReply({
      content: "Profiel succesvol verwijderd",
      ephemeral: true,
    });
  } else {
    await interaction.editReply({
      content: "Profiel niet gevonden.",
      ephemeral: true,
    });
  }
};
