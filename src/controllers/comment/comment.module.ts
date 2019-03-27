import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleEntity } from 'src/models/article.entity';
import { CommentEntity } from 'src/models/comment.entity';

import { ArticleModule } from '../article/article.module';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';


@Module({
  imports: [
    ArticleModule,
    TypeOrmModule.forFeature([
      CommentEntity,
      ArticleEntity
    ])
  ],
  controllers: [
    CommentController,
  ],
  providers: [
    CommentService
  ]
})
export class CommentModule { }
