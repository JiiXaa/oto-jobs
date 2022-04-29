## client - made with CRA template

#### Normalize.css and Global Styles

- CSS in JS
- speeds up the development
- normalize.css isa small CSS file that provides cross-browser consistency in the default styling of HTML elements.
- (normalize)[https://necolas.github.io/normalize.css/]
- npm install normalize.css and import in the index.js (have to be set above 'index.css')

#### React Router v6, newest version (as of march, 2022)

- helps with navigation to show various components/pages to a user depending on the URL.

#### Mongoose User Model

Used third-party validator, simple and robust package with many options.

- [Validator Package](https://www.npmjs.com/package/validator)

#### Express-Async-Errors Package

A dead simple ES6 async/await support hack for ExpressJS

- no need for try/catch
- import it in server.js

- [Express-Async-Errors](https://www.npmjs.com/package/express-async-errors)

#### Http Status Codes

- constants for status codes
- provide consistency and less bugs
- easier to read/manage

- [Http Status Codes Package](https://www.npmjs.com/package/http-status-codes)

- import/setup in authController and error-handler
- setup defaultError
