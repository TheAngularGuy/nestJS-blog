import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleEntity } from 'src/models/article/article.entity';
import { UtilitiesService } from 'src/services/utilities/utilities.service';

import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ArticleEntity
    ]),
    AuthModule,
    UserModule
  ],
  controllers: [
    ArticleController
  ],
  providers: [
    ArticleService,
    UtilitiesService
  ],
  exports: [
    ArticleService
  ]
})
export class ArticleModule { }
