import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { APP_CONFIG } from 'src/config/app.config';

import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secretOrPrivateKey: APP_CONFIG.secretKey,
      signOptions: {
        algorithm: 'HS512',
        expiresIn: APP_CONFIG.expiresIn,
      }
    }),
    forwardRef(() => UserModule),
  ],
  controllers: [
    AuthController
  ],
  providers: [
    AuthService,
    JwtStrategy,
  ],
  exports: [
    PassportModule,
    JwtModule
  ]
})
export class AuthModule { }
