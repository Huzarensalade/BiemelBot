const mongoose = require("mongoose");
require("dotenv/config");

module.exports = {
  name: "dbConnection",
  async execute(client) {
    // try database connection
    await mongoose.connect(
      `mongodb+srv://${process.env.DBUSER}:${process.env.DBPASS}@${process.env.DBURI}/?retryWrites=true&w=majority`,
      {
        keepAlive: true,
      }
    );

    console.log("Database Connection Established.");
  },
};
