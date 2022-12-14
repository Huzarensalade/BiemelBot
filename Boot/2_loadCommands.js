const fs = require("node:fs");
const path = require("node:path");
const { REST } = require("@discordjs/rest");
const { Routes, Collection } = require("discord.js");
require("dotenv/config");

module.exports = {
  name: "loadCommands",
  async execute(client) {
    registerCommands(client);
  },
};

async function registerCommands(client) {
  const commands = [];
  const commandsPath = path.join(process.cwd(), "Commands");
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".js"));

  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    commands.push(command.data.toJSON());
  }

  const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

  rest
    .put(
      Routes.applicationGuildCommands(
        process.env.CLIENTID,
        process.env.GUILDID
      ),
      { body: commands }
    )
    .then(
      (data) =>
        console.log(`Server successfully registered ${data.length} commands!`),

      loadCommands(client)
    )
    .catch(console.error);
}

async function loadCommands(client) {
  client.commands = new Collection();
  const commandsPath = path.join(process.cwd(), "Commands");
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".js"));

  let counter = 0;
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    client.commands.set(command.data.name, command);
    counter++;
  }

  console.log(`Bot succesfully loaded ${counter} commands!`);
}
