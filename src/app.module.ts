import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DATABASE_CONFIG } from './config/database.config';
import { ArticleModule } from './controllers/article/article.module';

@Module({
  imports: [
    ArticleModule,

    TypeOrmModule.forRoot(DATABASE_CONFIG),
  ],
  controllers: [
  ],
  providers: [
  ],
})
export class AppModule { }
