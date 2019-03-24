import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHelloObject(): any {
    return {
      msg: 'Hello World',
    };
  }
}
