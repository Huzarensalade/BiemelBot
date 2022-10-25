# Chapters

1.  Disclaimer
2.  Installing the source code
3.  Creating a new module
4.  Editing / Fixing existing module
5.  Changelog

# Disclaimer

This README is written assuming the fact you have Github Desktop, Visual Studio Code and Node.JS installed, and have basic knowledge operation with these software.
If this is not the case, or if you come across a term you dont understand, don't thread further and contact the development team for help.

# Installing the source code

1.  Clone the Main branche to your folder.
2.  Open the folder in VS Code.
3.  Open the terminal.
4.  Run command "npm install discord.js @discordjs/rest dotenv mongoose@latest".
5.  In root, create file ".env" and insert the data provided by the project leader.
6.  If everything went well, you can type "node BiemelBot.js" and the bot will succesfully launch, as you can see it online in the test server.

# Creating a new module

1.  Create a new brach, formatted as followed, where name is the name of the module you want to build: Module "name". (or merge an existing one with main)
2.  Start coding. It is important that you commit every now and then, and explain in your commits what you changed.
    Make sure you test everything and make sure no errors pop up. If you want to make a checkpoint, push your commits to your branch.
    If you create a new command, you need to run "node deploy-commands.js" and restart the bot to add the command to the server.
3.  If you believe you are completely done, check if you used any id's from the test server in your code.
    If so, change these id's to the ones from the live server. Commit this change with commit summary "Final Touch", and push it to your branch.
4.  Create a pull request for your branch, and let the other developers know a module is finished.
    if your request is accepted, your module will be merged in the main branch, noted in the changelog, and set live next update.

# Editing / Fixing existing module

1.  Open the branch correspoding the module you would like to change.
2.  merge main branche into the current branche.
3.  Follow the same steps as creating a new module from here. Start coding, commit and push, and when you are done create a new pull request.

# Code Examples

```js
// making a database schema (new file in folder ./DB-Schemas)
const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("testing", schema);

// making a database call using a schema (in your command/function)
const testSchema = require("./DB-Schemas/test-schema");

await new testSchema({
  message: "hello world",
}).save();
```

# Common Errors
ERROR:    The term 'node' is not recognized as the name of a cmdlet, function, script file, or operable program.
REASON:   Node.js is not installed correctly or VS-Code doesn't have permission to run it.
FIX:      Install the latest Node.js version and restart VS-Code

ERROR:    Cannot find module 'discord.js'
REASON:   discord.js is not installed
FIX:      Run npm install command at "#installing the source code, item 4, rule 19"

ERROR:    Unexpected token '.' when trying to run 'npm install'
REASON:   Outdated NVM version installed
FIX:      Install the latest NVM version and restart VS-Code

ERROR:    An invalid token was provided.
REASON:   You don't have the .env file set up or the values are incorrect
FIX:      Copy all values from the discord server development channel into your .env file (or create a new .env file)