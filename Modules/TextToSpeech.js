const { ActionRowBuilder, SelectMenuBuilder } = require("@discordjs/builders");

module.exports.startProcess = async (interaction) => {
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

  let languageID;

  const collector = message.createMessageComponentCollector();
  collector.on("collect", (i) => {
    if (
      i.user.id === interaction.user.id &&
      i.isSelectMenu() &&
      i.customId === "ttsLanguageSelector"
    ) {
      languageID = i.values[0];
      if (languageID == "nl") {
        interaction.editReply({
          content: `Gekozen taal: **Nederlands** \n\n Nieuwe TTS sessie geopend in je DM's!`,
          components: [],
        });
      } else if (languageID == "en") {
        interaction.editReply({
          content: `Chosen language: **English** \n\n New TTS session started in your DM's!`,
          components: [],
        });
      }

      setupCollector(interaction, languageID);
      collector.stop();
    }
  });
};

async function setupCollector(interaction, languageID) {
  let startingMessage;

  if (languageID == "nl") {
    startingMessage = await interaction.user.send(
      '**Text To Speech sessie gestart!** \n Typ je berichten hier en de bot zal ze uitspreken in je huidige voicekanaal! \n\n Stop deze sessie met **"/stop"**'
    );
  } else if (languageID == "en") {
    startingMessage = await interaction.user.send(
      '**Text To Speech session started!** \n Type your message and the bot will say it out loud in your current voicechannel! \n\n Stop this session by typing **"/stop"**'
    );
  }

  
}
