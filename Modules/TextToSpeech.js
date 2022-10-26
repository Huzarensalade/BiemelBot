const { ActionRowBuilder, SelectMenuBuilder } = require("@discordjs/builders");

module.exports.startProcess = async (interaction) => {
  const languageID = getLanguageID(interaction);
};

async function getLanguageID(interaction) {
  await interaction.deferReply({ ephemeral: true });

  const languageSelector = new ActionRowBuilder().addComponents(
    new SelectMenuBuilder()
      .setCustomId("ttsLanguageSelector")
      .setPlaceholder("Selecteer taal")
      .addOptions(
        {
          label: "Nederlands",
          description: "Converteer de Text To Speech bot naar het Nederlands",
          value: "nl",
        },
        {
          label: "English",
          description: "Convert the Text To Speech bot to English",
          value: "en",
        }
      )
  );

  const message = await interaction.editReply({
    content: "Kies een taal: / Choose a language:",
    components: [languageSelector],
  });

  let languageID = "";

  const collector = message.createMessageComponentCollector({ time: 15000 });
  collector.on("collect", (i) => {
    if (
      i.user.id === interaction.user.id &&
      i.isSelectMenu() &&
      i.customId === "ttsLanguageSelector"
    ) {
      languageID = i.values[0];
      if (languageID == "nl") {
        interaction.editReply({
          content: `Gekozen taal: **Nederlands**`,
          components: [],
        });
      } else if (languageID == "en") {
        interaction.editReply({
          content: `Chosen language: **English**`,
          components: [],
        });
      }

      return languageID;
    }
  });
}