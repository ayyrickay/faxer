# faxer
A react app for sending faxes... Entirely on the client.

## Setup
This app was built using Node v8.8.1

Once you've cloned this repository, install the app dependencies using `npm install`. You'll also want to go into `src/config` and duplicate `template.js`. Rename the duplicated file `index.js` and include your twilio credentials (don't worry, this is gitignored.) Once dependencies are installed and your configuration is set up, you can use the command `npm start` to run the app. It should appear on `localhost:8080`.

## Other commands

`npm test` runs the suite of unit tests against the app. This is particularly useful if you intend to extend the app without changing its core behaviors (note: Faxer is not extensively unit tested.)

`npm run lint` will run a linter on the application and make fun of your syntax. Linting rules are based on my personal preferences - namely, my preference for avoiding semicolons and double quotes in my code.
