# Blog front

Creating a blog with NestJS in the backend and Angular + NgRx in the frontend

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

ng g store State --root --module app.module.ts

ng g action modules/xxx/state/xxx

ng g reducer modules/xxx/state/xxx --spec=false --flat=false --module modules/xxx/xxx.module.ts

ng g effect modules/xxx/state/xxx --spec=false --flat=false --module modules/xxx/xxx.module.ts

## Info

The Layout module is the modules that wraps all of the pages except the ones relative to authentication. So most of the routes are located in there.
