const { EmbedBuilder } = require("discord.js");
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

module.exports.addRecord = async (interaction) => {
  await interaction.deferReply({ ephemeral: true });

  const excercise = interaction.options.getString("excercise");
  const value = interaction.options.getInteger("value");
  const query = { [excercise]: value };
  const userID = interaction.user.id;

  const execute = await PR_Schema.findOneAndUpdate(
    { userID: userID },
    query
  ).exec();

  if (execute == null) {
    await interaction.editReply({
      content:
        "Profiel niet gevonden, maak een nieuw profiel aan met /pr create",
      ephemeral: true,
    });

    return;
  }

  await interaction.editReply({
    content: "PR succesvol toegevoegd!",
    ephemeral: true,
  });
};

module.exports.showEmbed = async (interaction) => {
  await interaction.deferReply({ ephemeral: true });

  let user = interaction.options.getUser("target");
  if (user == null) {
    user = interaction.user;
  }

  const execute = await PR_Schema.findOne({ userID: user.id }).exec();
  if (execute == null) {
    await interaction.editReply({
      content: "Profiel niet gevonden.",
      ephemeral: true,
    });

    return;
  }

  const dbData = Object.entries(execute["_doc"]);
  const rawEmbedFields = dbData.map(function ([key, value]) {
    if (key != "_id" && key != "__v" && key != "userID") {
      return { name: key, value: `${value} KG` };
    }
  });

  const finalEmbedFields = rawEmbedFields.filter((element) => {
    return element !== undefined;
  });

  console.log(finalEmbedFields);

  const prCard = new EmbedBuilder()
    .setColor(0x0099ff)
    .setTitle(`${user.username}'s PR-Card`)
    .setThumbnail(user.avatarURL())
    .addFields(...finalEmbedFields);

  interaction.editReply({ embeds: [prCard], ephemeral: true });
};
