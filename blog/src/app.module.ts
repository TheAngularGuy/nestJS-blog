import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DATABASE_CONFIG } from './config/database.config';
import { ArticleModule } from './controllers/article/article.module';
import { AuthModule } from './controllers/auth/auth.module';
import { CommentModule } from './controllers/comment/comment.module';
import { UserModule } from './controllers/user/user.module';
import { CategoryModule } from './controllers/category/category.module';




@Module({
  imports: [
    TypeOrmModule.forRoot(DATABASE_CONFIG),

    AuthModule,
    UserModule,
    ArticleModule,
    CommentModule,
    CategoryModule,
  ]
})
export class AppModule { }
