const mongoose = require("mongoose");
require("dotenv/config");
const path = require("node:path");
const fs = require("fs");

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    // try database connection
    await mongoose.connect(
      `mongodb+srv://${process.env.DBUSER}:${process.env.DBPASS}@${process.env.DBURI}/?retryWrites=true&w=majority`,
      {
        keepAlive: true,
      }
    );
    //#region Event Handler
    const bootPath = path.join(process.cwd(), "Boot");
    const bootFiles = fs
      .readdirSync(bootPath)
      .filter((file) => file.endsWith(".js"));

    for (const file of bootFiles) {
      const filePath = path.join(bootPath, file);
      const boot = require(filePath);
      await boot.execute(client);
    }
    // #endregion

    console.log("BiemelBot startup succesfull!");
  },
};
