# nest-blog-api

## Description

A simple implementation of a blog with JWT authentication.

## Installation

First install postgres and start the pgsql server. Then create a database called `nest_blog` and configure it to be accessible on port `5432` with the following access:

- user: “local”
- password: “local”

Then:

```bash
cd back/
$ yarn start # or npm run start
```

> ℹ️ The database settings can be changed in the `back/src/config/database.config.js`

## Running the app

```bash
# development
$ yarn start # or npm run start

# watch mode
$ yarn start:dev # or npm run start:dev

# production mode
$ yarn start:prod # or npm run start:prod
```

## Postman

To use the API with Postman:

- Import the environement file named `nest_blog.postman_environment.json` by clicking in the "import" button.
- Then import the collection file named `nest_blog.postman_collection.json`.
