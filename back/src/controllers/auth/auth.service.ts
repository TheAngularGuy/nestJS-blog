import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { APP_CONFIG } from 'src/config/app.config';
import { JwtPayload } from 'src/models/auth/jwt.payload';
import { JwtToken } from 'src/models/auth/jwt.token';
import { LoginDto } from 'src/models/auth/login.dto';
import { SigninDto } from 'src/models/auth/signin.dto';
import { UserEntity } from 'src/models/user/user.entity';

import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private jwtService: JwtService) {}

  public async signIn(user: SigninDto): Promise<JwtToken> {
    const newUser: UserEntity = {
      ...user
    };
    newUser.salt = await bcrypt.genSalt();
    newUser.password = await bcrypt.hash(user.password, newUser.salt);
    const createdUser = await this.userService.createUser(newUser);
    return this.createJwtPayload(createdUser);
  }

  public async logIn(user: LoginDto): Promise<JwtToken> {
    const userFound = await this.validateUserByPassword(user);
    return this.createJwtPayload(userFound);
  }

  private async validateUserByPassword(user: LoginDto): Promise<UserEntity> {
    const userToCheck = await this.userService.getOneUserByEmail(user.email);
    const hashedPassword = await bcrypt.hash(user.password, userToCheck.salt);
    return await this.userService.getOneUserByEmailAndPassword(user.email, hashedPassword);
  }

  async validateUserByJwt(payload: JwtPayload) {
    const user = await this.userService.getOneUserByEmail(payload.email);
    return this.createJwtPayload(user);
  }

  createJwtPayload(user: UserEntity): JwtToken {
    const data: JwtPayload = {
      email: user.email
    };
    const jwt = this.jwtService.sign(data);
    return {
      token: jwt,
      expireDate: new Date(Date.now() + APP_CONFIG.expiresIn * 1000).valueOf(),
      user
    };
  }

  // https://www.joshmorony.com/adding-jwt-authentication-to-an-ionic-application-with-mongodb-and-nestjs/
}
