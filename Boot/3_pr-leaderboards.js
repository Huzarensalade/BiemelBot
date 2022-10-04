const PR_Schema = require("../DB-Schemas/pr-schema");
require("dotenv/config");

module.exports = {
  name: "pr-leaderboards",
  async execute(client) {
    const channel = client.channels.cache.get(process.env.PRLEADERBOARDS);
    let minuteCounter = 5;

    // clear channel
    const messageList = await channel.messages.fetch();
    if (messageList.size != 0) {
      await channel.bulkDelete(messageList.size, true);
    }

    // create workout list
    const PR_Attributes = PR_Schema.schema.paths;
    attributeList = Object.keys(PR_Attributes);
    attributeList.splice(attributeList.length - 2, 2);
    attributeList.shift();

    // send messages
    let leaderboardContent = `**PR Leaderboard**`;
    const counterContent = `The leaderboards will refresh in ${minuteCounter} minutes!`;
    const leaderboardMessage = await channel.send(leaderboardContent);
    const counterMessage = await channel.send(counterContent);

    setInterval(async () => {
      if (minuteCounter == 0) {
        minuteCounter = 60;
        await fillLeaderboard(
          leaderboardMessage,
          leaderboardContent,
          attributeList,
          client
        );
        editCounter(counterMessage, minuteCounter);
      } else {
        minuteCounter = minuteCounter - 1;
        editCounter(counterMessage, minuteCounter);
      }
    }, 1000);
  },
};

function editCounter(counterMessage, minuteCounter) {
  counterMessage.edit(
    `The leaderboards will refresh in ${minuteCounter} minutes!`
  );
}

async function fillLeaderboard(
  leaderboardMessage,
  leaderboardContent,
  attributeList,
  client
) {
  const data = await PR_Schema.find({});
  attributeList.forEach((workout) => {
    leaderboardContent = `${leaderboardContent}\n\n**${workout}**`;

    let counter = 1;
    data.forEach(async (PR) => {
      if (PR[workout] != undefined) {
        leaderboardContent = `${leaderboardContent}\n${counter}. ${PR[workout]}KG, <@${PR.userID}>`;
        counter++;
      }
    });
  });

  leaderboardMessage.edit(leaderboardContent);
}
