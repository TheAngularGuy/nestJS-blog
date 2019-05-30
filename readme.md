# nestJS-blog

Creating a blog with NestJS in the backend and Angular + NgRx in the frontend.

## Screenshot

<p align="center">
  <img src="screenshot/capture.gif">
</p>

## Start the backend: NestJS server

create a postgres the database called `nest_blog` and configure it to be accessible on port `5432` with user “local” and password “local”, then:

```
cd back/
npm run start
```

ℹ️ The settings can easily be changed in the `back/src/config/database.config.js`

## Start the frontend: Angular

```
cd front/
ng serve -o
```
