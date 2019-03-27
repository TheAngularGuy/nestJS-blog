import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DATABASE_CONFIG } from './config/database.config';
import { ArticleModule } from './controllers/article/article.module';
import { AuthModule } from './controllers/auth/auth.module';
import { CommentModule } from './controllers/comment/comment.module';
import { UserModule } from './controllers/user/user.module';





@Module({
  imports: [
    TypeOrmModule.forRoot(DATABASE_CONFIG),

    ArticleModule,
    CommentModule,
    AuthModule,
    UserModule,
  ],
  providers: [

  ],
  controllers: [

  ],
})
export class AppModule { }
