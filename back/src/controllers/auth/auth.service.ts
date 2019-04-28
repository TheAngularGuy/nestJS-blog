import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { APP_CONFIG } from 'src/config/app.config';
import { JwtPayload } from 'src/models/auth/jwt.payload';
import { JwtToken } from 'src/models/auth/jwt.token';
import { LoginDto } from 'src/models/auth/login.dto';
import { PasswordDto } from 'src/models/auth/password.dto';
import { SigninDto } from 'src/models/auth/signin.dto';
import { UserEntity } from 'src/models/user/user.entity';

import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private jwtService: JwtService) {}

  public async signIn(user: SigninDto): Promise<JwtToken> {
    const newUser: UserEntity = {
      ...user,
    };
    newUser.salt = await bcrypt.genSalt();
    newUser.password = await bcrypt.hash(user.password, newUser.salt);
    const createdUser = await this.userService.createUser(newUser);
    return this.createJwtPayload(createdUser);
  }

  public async editPassword(userId: number, passwords: PasswordDto) {
    const user = await this.userService.getOneUserById(userId);
    const loginObject: LoginDto = {
      email: user.email,
      password: passwords.password,
    };
    const verifiedUser = await this.validateUserByPassword(loginObject);
    const userWithSalt = await this.userService.getOneUserSaltByEmail(verifiedUser.email);
    if (passwords.password1 != passwords.password2) {
      const e = new Error('Password does not match');
      e.name = 'Password does not match';
      throw e;
    }
    const hashedPassword = await bcrypt.hash(passwords.password1, userWithSalt.salt);
    return this.userService.editUser(userId, {
      ...verifiedUser,
      password: hashedPassword,
    });
  }

  public async logIn(user: LoginDto): Promise<JwtToken> {
    const userFound = await this.validateUserByPassword(user);
    return this.createJwtPayload(userFound);
  }

  private async validateUserByPassword(user: LoginDto): Promise<UserEntity> {
    const userToCheck = await this.userService.getOneUserSaltByEmail(user.email);
    const hashedPassword = await bcrypt.hash(user.password, userToCheck.salt);
    return await this.userService.getOneUserByEmailAndPassword(user.email, hashedPassword);
  }

  async validateUserByJwt(payload: JwtPayload) {
    const user = await this.userService.getOneUserByEmail(payload.email);
    return this.createJwtPayload(user);
  }

  createJwtPayload(user: UserEntity): JwtToken {
    const data: JwtPayload = {
      email: user.email,
    };
    const jwt = this.jwtService.sign(data);
    return {
      token: jwt,
      expireDate: new Date(Date.now() + APP_CONFIG.expiresIn * 1000).valueOf(),
      user,
    };
  }

  // https://www.joshmorony.com/adding-jwt-authentication-to-an-ionic-application-with-mongodb-and-nestjs/
}
