import { ErrorHandler, Injectable } from '@angular/core';

@Injectable()
export class AppErrorsHandeler implements ErrorHandler {
  handleError(error: Error) {
    console.error('An error occured and was catched: ', error);
  }
}

// https://medium.com/@aleixsuau/error-handling-angular-859d529fa53a
