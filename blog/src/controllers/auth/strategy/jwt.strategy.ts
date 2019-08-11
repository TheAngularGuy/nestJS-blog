import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { APP_CONFIG } from 'src/config/app.config';
import { JwtPayload } from 'src/models/auth/jwt.payload';

import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {

  constructor(private authService: AuthService) {

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: APP_CONFIG.secretKey,
    });

  }

  async validate(payload: JwtPayload) {
    try {
      return await this.authService.validateUserByJwt(payload);
    } catch (err) {
      throw new UnauthorizedException();
    }
  }

}
