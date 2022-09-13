# Common Errors

ERROR: Error: Cannot find module 'node:events'.  
CAUSE: An outdated framework is installed.  
FIX 1: Go to https://nodejs.org/en/ and download the latest version.
FIX 2: Download the latest version of discord.js using "npm install discord.js"

ERROR: The term '.....' is not recognized....  
CAUSE: The dependencies are not installed or out of date.  
FIX: Open terminal --> npm install discord.js dotenv nodemon.

ERROR: [TokenInvalid]: An invalid token was provided. 
CAUSE: The wrong discord bot token was used.  
FIX: create .env file in root directory with value "TOKEN=(insert token without brackets)".