import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/models/auth/jwt.payload';

@Injectable()
export class UtilitiesService {

  constructor(private jwtService: JwtService) { }

  async headersToJwtDecoded(headers: any): Promise<JwtPayload> {
    if (headers && headers.authorization) {
      return this.jwtService.decode(headers.authorization.split('Bearer ')[1]) as JwtPayload;
    }
    throw new Error('token not good');
  }

}
