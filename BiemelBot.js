const { Client, GatewayIntentBits, Collection } = require("discord.js");
require("dotenv/config");
const fs = require("fs");

//#region Hard Variables
const prefix = "/";
//#endregion

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

//#region Command Handler
client.commands = new Collection();
const commandFiles = fs
  .readdirSync("./Commands/")
  .filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(`./Commands/${file}`);
  client.commands.set(command.name, command);
}

client.on("message", (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === "ping") {
    client.commands.get("ping").execute(message, args);
  }
});
//#endregion

client.on("ready", () => {
  console.log("BiemelBot started and ready!");
});

client.login(process.env.TOKEN);
