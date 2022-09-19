const { Client, GatewayIntentBits, Collection } = require("discord.js");
require("dotenv/config");
const fs = require("fs");
const path = require("node:path");
const mongoose = require("mongoose");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once("ready", async () => {
  // try database connection
  await mongoose.connect(
    `mongodb+srv://${process.env.DBUSER}:${process.env.DBPASS}@${process.env.DBURI}/?retryWrites=true&w=majority`,
    {
      keepAlive: true,
    }
  );

  console.log("BiemelBot startup succesfull!");
});

//#region Command Handler
client.commands = new Collection();
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  client.commands.set(command.data.name, command);
}

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = interaction.client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
});
//#endregion

client.login(process.env.TOKEN);
