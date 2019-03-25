import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DATABASE_CONFIG } from './config/database.config';
import { ArticleModule } from './controllers/article/article.module';
import { CommentModule } from './controllers/comment/comment.module';


@Module({
  imports: [
    TypeOrmModule.forRoot(DATABASE_CONFIG),

    ArticleModule,
    CommentModule,
  ],
  providers: [
  ],
})
export class AppModule { }
