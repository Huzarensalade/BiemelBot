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
  4.  Run command "npm install discord.js dotenv nodemon".
  5.  In root, create file ".env" and insert the given test token as TOKEN="ABCDEF" where ABCDEF is the given token.
  6.  If everything went well, you can type "node BiemelBot.js" and the bot will succesfully launch, as you can see it online in the test server.

# Creating a new module
  1.  Create a new brach, formatted as followed, where name is the name of the module you want to build: Module "name".
  2.  Start coding. It is important that you commit every now and then, and explain in your commits what you changed. 
      Make sure you test everything and make sure no errors pop up. If you want to make a checkpoint, push your commits to your branch. 
  3.  If you believe you are completely done, check if you used any id's from the test server in your code. 
      If so, change these id's to the ones from the live server. Commit this change with commit summary "Final Touch", and push it to your branch.
  4.  Create a pull request for your branch, and let the other developers know a module is finished.
      if your request is accepted, your module will be merged in the main branch, noted in the changelog, and set live next update.
      
# Editing / Fixing existing module
  1.  Open the branch correspoding the module you would like to change.
  2.  merge main branche into the current branche.
  3.  Follow the same steps as creating a new module from here. Start coding, commit and push, and when you are done create a new pull request. 
    
# Changelog
version 0.0.2: putting project live on PI and writing README.md  
version 0.0.1: setting up project  
