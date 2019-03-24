import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleEntity } from 'src/models/article.entity';
import { CommentEntity } from 'src/models/comment.entity';

import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ArticleEntity,
      CommentEntity
    ])
  ],
  controllers: [
    ArticleController
  ],
  providers: [
    ArticleService
  ]
})
export class ArticleModule { }
