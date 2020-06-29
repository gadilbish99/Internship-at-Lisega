# Hazardous-Substance-Registration-Web-App
This is the Back-End part of hazardous substance registration web app. 

To prepare the development environment, please refer to [Documentations](#documentations)

# Getting started

To get the Node server running locally:

- Clone this repo
- `mv .env.example .env`
- `yarn install` to install all required dependencies
- Install MongoDB Community Edition ([instructions](https://docs.mongodb.com/manual/installation/#tutorials))
- `yarn start` to start the local server

# Code Overview

## Dependencies

- [express](https://github.com/expressjs/express) - The server for handling and routing HTTP requests
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) - For generating JWTs used by authentication
- [mongoose](https://github.com/Automattic/mongoose) - For modeling and mapping MongoDB data to javascript 
- [mongoose-paginate-v2](https://www.npmjs.com/package/mongoose-paginate-v2) - For handling pagination to fetch data
- [bcryptjs](https://www.npmjs.com/package/bcryptjs) - For encrypting and decrypting passwords
- [cookie-parser](https://www.npmjs.com/package/cookie-parser) - For parsing a cookie
- [cors](https://www.npmjs.com/package/cors) - For allowing Cross-origin resource sharing
- [dotenv](https://www.npmjs.com/package/dotenv) - For loading environmental variables from a `.env` file
- [bcryptjs](https://www.npmjs.com/package/bcryptjs) - For encrypting and decrypting passwords
- [morgan](https://www.npmjs.com/package/morgan) - For logging HTTP requests
- [pdfkit](https://pdfkit.org) - For generating a PDF document
- [validator](https://www.npmjs.com/package/validator) - For validating strings



## Application Structure

- `app.js` - The entry point to our application. This file defines our express server. It also contains the routes we'll be using in the application.
- `src/database.js` - This file connects it to MongoDB using mongoose and handles database requests.
- `src/error.js` - This file contains an error handling function.
- `src/isAuth.js` - This file checks whether a token is valid or not. 
- `src/pdfGenerator.js` - This file contains a pdf document generating function.
- `src/tokens.js` - This file creates an access token and a refreshing token and sends the tokens to the user. 
- `src/db/` - This folder contains the schema definitions for our Mongoose models.

## Documentations
* [Node version management](https://github.com/tj/n)
* [Yarn documentation](https://legacy.yarnpkg.com/en/docs)
