# nestJS-blog

A simple implementation of a blog with JWT authentication.
A client application implemented with Angular + NgRx is included in the `client` folder.

## Screenshot

<p align="center">
  <img src="screenshot/capture.gif">
</p>

## Installation

First install postgres and start the pgsql server. Then create a database called `nest_blog` and configure it to be accessible on port `5432` with the following access:

- user: “local”
- password: “local”

Then:

```bash
cd back/
$ yarn start # or npm run start
```

## Postman

To use the API with Postman:

- Import the environement file named `nest_blog.postman_environment.json` by clicking in the "import" button.
- Then import the collection file named `nest_blog.postman_collection.json`.

## Start the Angular app

```bash
$ cd front/
$ ng serve -o
```
