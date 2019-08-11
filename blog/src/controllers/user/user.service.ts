import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleEntity } from 'src/models/article/article.entity';
import { UserDto } from 'src/models/user/user.dto';
import { UserEntity } from 'src/models/user/user.entity';
import { Repository } from 'typeorm';

import { ArticleService } from '../article/article.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>,
    @Inject(forwardRef(() => ArticleService))
    private readonly articleService: ArticleService,
  ) {}

  getCount(): Promise<number> {
    return this.userRepo.count({});
  }

  getUsers(page = 1, take = 25): Promise<UserEntity[]> {
    return this.userRepo.find({
      skip: take * (page - 1),
      take,
      order: {
        id: -1,
      },
    });
  }

  getAuthors(page = 1, take = 25): Promise<UserEntity[]> {
    return this.userRepo.find({
      /* skip: take * (page - 1),
      take, */
      where: {
        isAuthor: true,
      },
    });
  }

  async getOneUserByEmail(email: string): Promise<UserEntity> {
    return await this.userRepo.findOneOrFail({
      where: {
        email,
      },
    });
  }

  async getOneUserArticlesByEmail(
    email: string,
    page?: number,
    take?: number,
  ): Promise<ArticleEntity[]> {
    const u = await this.userRepo.findOneOrFail({
      where: {
        skip: take * (page - 1),
        take,
        email,
      },
    });
    return await this.articleService.getArticlesByUser(u, page, take);
  }
  async getOneUserArticlesCountByEmail(email: string): Promise<number> {
    const u = await this.userRepo.findOneOrFail({
      where: {
        email,
      },
    });
    return await this.articleService.getArticlesCountByUser(u);
  }

  async getOneUserSaltByEmail(email: string): Promise<UserEntity> {
    return await this.userRepo
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .select(['user.salt'])
      .getOne();
  }

  async getOneUserByEmailAndPassword(email: string, password: string): Promise<UserEntity> {
    return await this.userRepo.findOneOrFail({
      where: {
        email,
        password,
      },
    });
  }

  async getOneUserById(id: number): Promise<UserEntity> {
    return await this.userRepo.findOneOrFail({
      where: {
        id,
      },
    });
  }

  async createUser(user: UserDto): Promise<UserEntity> {
    return await this.userRepo.save(user);
  }

  async deleteUser(user: UserDto): Promise<UserEntity> {
    return await this.userRepo.remove(user);
  }

  async editUser(userId: number, user: UserDto): Promise<UserEntity> {
    await this.userRepo.findOneOrFail(userId);
    await this.userRepo.update(userId, user);
    return this.userRepo.findOneOrFail(userId);
  }
}
