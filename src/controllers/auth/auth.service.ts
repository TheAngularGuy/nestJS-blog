import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';
import { UserDto } from 'src/models/user.dto';
import { UserEntity } from 'src/models/user.entity';

import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) { }

  public async signIn(user: UserDto): Promise<UserEntity> {
    user.password = crypto.createHmac('sha256', user.password).digest('hex');
    return this.userService.createUser(user);
  }

  public async logIn(user: UserDto): Promise<any> {
    const userFound = await this.validateUserByPassword(user);
    if (userFound) {
      return this.createJwtPayload(user);
    } else {
      return null;
    }
  }

  private validateUserByPassword(user: UserDto): Promise<UserEntity> {
    return this.userService.getOneUserByEmailAndPassword(
      user.email,
      crypto.createHmac('sha256', user.password).digest('hex')
    );
  }

  async validateUserByJwt(payload: { email: string }) {
    // This will be used when the user has already logged in and has a JWT
    const user = await this.userService.getOneUserByEmail(payload.email);
    if (user) {
      return this.createJwtPayload(user);
    } else {
      return null;
    }

  }

  createJwtPayload(user) {
    const data = {
      email: user.email
    };
    const jwt = this.jwtService.sign(data);
    return {
      expiresIn: 3600,
      token: jwt
    };
  }
  // https://www.joshmorony.com/adding-jwt-authentication-to-an-ionic-application-with-mongodb-and-nestjs/

}
