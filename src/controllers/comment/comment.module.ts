import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleEntity } from 'src/models/article.entity';
import { CommentEntity } from 'src/models/comment.entity';

import { ArticleService } from '../article/article.service';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([
      CommentEntity,
      ArticleEntity
    ])
  ],
  controllers: [
    CommentController,
  ],
  providers: [
    CommentService,
    ArticleService
  ]
})
export class CommentModule { }
