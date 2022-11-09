const { ActionRowBuilder, SelectMenuBuilder } = require("@discordjs/builders");
const { joinVoiceChannel } = require("@discordjs/voice");

module.exports.startProcess = async (interaction) => {
  const Guild = interaction.member.guild;
  const BotUser = Guild.members.cache.get(interaction.client.user.id);

  await interaction.deferReply({ ephemeral: true });

  if (BotUser.voice.channel) {
    interaction.editReply(
      "Bot is already in use in another voice channel. Try again later."
    );
  } else {
    setupLanguageSelect(interaction);
  }
};

async function setupLanguageSelect(interaction) {
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

      setupDMChannel(interaction, languageID);
      collector.stop();
    }
  });
}

async function setupDMChannel(interaction, languageID) {
  let languageSelector;

  const channels = await interaction.guild.channels.fetch();
  const voiceChannels = channels.filter((channel) => channel.type === 2);

  for (var vc in voiceChannels) {
    console.log(vc.id + vc.name)
  }

  // languageSelector = new ActionRowBuilder().addComponents(
  //   new SelectMenuBuilder()
  //     .setCustomId("ttsLanguageSelector")
  //     .setPlaceholder("Selecteer taal")
  //     .addOptions(
  //       {
  //         label: "Nederlands",
  //         description: "Converteer de Text To Speech bot naar het Nederlands",
  //         value: "nl",
  //       },
  //       {
  //         label: "English",
  //         description: "Convert the Text To Speech bot to English",
  //         value: "en",
  //       }
  //     )
  // );

  let startingMessage;

  if (languageID == "nl") {
    startingMessage = await interaction.user.send(
      '**Text To Speech sessie gestart!** \n Typ je berichten hier en de bot zal ze uitspreken in je huidige voicekanaal! \n\n Stop deze sessie met **"/stop"**'
    );

    //createDMCollector(interaction, languageID, startingMessage);
  } else if (languageID == "en") {
    startingMessage = await interaction.user.send(
      '**Text To Speech session started!** \n Type your message and the bot will say it out loud in your current voicechannel! \n\n Stop this session by typing **"/stop"**'
    );

    //createDMCollector(interaction, languageID, startingMessage);
  }
}

async function setupVoiceConnection(interaction, languageID, TargetChannel) {
  let errorMessage;
  let connection;

  try {
    const connection = joinVoiceChannel({
      channelId: TargetChannel.id,
      guildId: TargetChannel.guild.id,
      adapterCreator: TargetChannel.guild.voiceAdapterCreator,
    });
  } catch (error) {
    if (languageID == "nl") {
      errorMessage = `Er is helaas een onbekende fout ontstaan: ${error}`;
    } else if (languageID == "en") {
      errorMessage = `Unfortunatly an unknown error has occured: ${error}`;
    }
  }

  setupDMChannel(
    interaction,
    languageID,
    TargetChannel,
    errorMessage,
    connection
  );
}

async function createDMCollector(interaction, languageID, startingMessage) {
  const voiceChannel = interaction.user.voice.channel;
  const connection = joinVoiceChannel({
    channelId: voiceChannel.id,
    guildId: voiceChannel.guild.id,
    adapterCreator: voiceChannel.guild.voiceAdapterCreator,
  });

  const DMCollector = startingMessage.channel.createMessageCollector();
  DMCollector.on("collect", (m) => {
    console.log(interaction); //console.log(m.content);
  });
}
