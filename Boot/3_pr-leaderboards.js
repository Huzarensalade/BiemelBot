const PR_Schema = require("../DB-Schemas/pr-schema");
require("dotenv/config");

module.exports = {
  name: "pr-leaderboards",
  async execute(client) {
    const channel = client.channels.cache.get(process.env.PRLEADERBOARDS);
    let minuteCounter = 1;

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
      if (minuteCounter == 1) {
        minuteCounter = 0;
        editCounter(counterMessage, minuteCounter);
        await fillLeaderboard(
          leaderboardMessage,
          leaderboardContent,
          attributeList
        );
        minuteCounter = 60;
        editCounter(counterMessage, minuteCounter);
      } else {
        minuteCounter = minuteCounter - 1;
        editCounter(counterMessage, minuteCounter);
      }
    }, 60000);
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
  attributeList
) {
  const data = await PR_Schema.find({});
  attributeList.forEach((workout) => {
    leaderboardContent = `${leaderboardContent}\n\n**${workout}**`;

    data.sort(sort_by(workout, true, parseInt));

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

function sort_by(field, reverse, primer) {
  const key = primer
    ? function (x) {
        return primer(x[field]);
      }
    : function (x) {
        return x[field];
      };

  reverse = !reverse ? 1 : -1;

  return function (a, b) {
    return (a = key(a)), (b = key(b)), reverse * ((a > b) - (b > a));
  };
}
