import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleEntity } from 'src/models/article/article.entity';
import { CommentEntity } from 'src/models/comment/comment.entity';

import { ArticleModule } from '../article/article.module';
import { AuthModule } from '../auth/auth.module';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([
      CommentEntity,
      ArticleEntity
    ]),
    ArticleModule,
    AuthModule
  ],
  controllers: [
    CommentController,
  ],
  providers: [
    CommentService
  ]
})
export class CommentModule { }
