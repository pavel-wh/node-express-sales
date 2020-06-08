# Express Course Sales App

[Sales App](https://node-express-sales.herokuapp.com/) is a Node.js application with Express.js framework.

## Clone repo

Clone this repo to your local machine using:

```bash
git clone https://github.com/pavel-wh/node-express-sales
```

## Installation

Use the Node package manager [npm](https://www.npmjs.com/) to install this app.

```bash
npm install
```

## Create Database

-   Sign in to [mongodb](https://account.mongodb.com/account) Create project, build cluster and create database. Register in [SendGrid](https://sendgrid.com/) get API Key.

-   Create keys.dev.js in `./keys/` folder with code below for local dev

```bash
module.exports = {
    MONGO_URI: 'mongodb+srv://<user>:<password>@cluster0-pppbb.mongodb.net/test?retryWrites=true&w=majority',
    SESSION_SECRET: 'secret JWT',
    SENDGRID_API_KEY: 'key',
    EMAIL_FROM: '<name>@domain.ru',
    BASE_URL: 'https://<name>.herokuapp.com/'
}
```

-   Add your local IP to Whitelist

## Build Setup

```bash

# serve with hot reload at localhost
npm run dev

# build for production and launch server
npm run start
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
