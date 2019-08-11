import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleDto } from 'src/models/article/article.dto';
import { ArticleEntity } from 'src/models/article/article.entity';
import { CategoryEntity } from 'src/models/category/category.entity';
import { UserEntity } from 'src/models/user/user.entity';
import { Repository } from 'typeorm';

import { CategoryService } from '../category/category.service';
import { CommentService } from '../comment/comment.service';
import { UserService } from '../user/user.service';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity) private readonly articleRepo: Repository<ArticleEntity>,
    private readonly catService: CategoryService,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    @Inject(forwardRef(() => CommentService))
    private readonly commentService: CommentService,
  ) {}

  getCount(): Promise<number> {
    return this.articleRepo.count({});
  }

  getArticles(page = 1, take = 25): Promise<ArticleEntity[]> {
    return this.articleRepo.find({
      relations: ['comments', 'categories', 'author'],
      skip: take * (page - 1),
      take,
      order: {
        createdAt: 'DESC',
      },
    });
  }

  getArticlesCountByUser(user: UserEntity): Promise<number> {
    return this.articleRepo.count({
      where: {
        author: user,
      },
    });
  }

  getArticlesByUser(user: UserEntity, page = 1, take = 25): Promise<ArticleEntity[]> {
    return this.articleRepo.find({
      relations: ['comments', 'categories'],
      skip: take * (page - 1),
      take,
      order: {
        createdAt: 'DESC',
      },
      where: {
        author: user,
      },
    });
  }

  async getArticlesCountByCategory(category: CategoryEntity): Promise<number> {
    const articlesCount = await this.articleRepo
      .createQueryBuilder('article')
      .innerJoin('article.categories', 'category', 'category.id = :catId', { catId: category.id })
      .getCount();
    return articlesCount;
  }

  async getArticlesByCategory(category: CategoryEntity, page = 1, take = 25): Promise<ArticleEntity[]> {
    const articles = await this.articleRepo
      .createQueryBuilder('article')
      .leftJoinAndSelect('article.author', 'user', 'user.id = article.author') // n->1
      .leftJoinAndSelect('article.comments', 'comment', 'comment.article = article.id') // 1->n
      .innerJoinAndSelect('article.categories', 'category', 'category.id = :catId', {
        catId: category.id,
      })
      .skip((page - 1) * take)
      .take(take)
      .orderBy('article.createdAt', 'DESC')
      .getMany();
    return articles;
  }

  async getArticlesCountByAuthor(author: UserEntity): Promise<number> {
    const articlesCount = await this.articleRepo.count({
      where: {
        author,
      },
    });
    return articlesCount;
  }

  async getArticlesByAuthor(author: UserEntity, page = 1, take = 25): Promise<ArticleEntity[]> {
    const articles = await this.articleRepo.find({
      where: {
        author,
      },
      order: {
        createdAt: 'DESC',
      },
      take,
      skip: (page - 1) * take,
      relations: ['comments', 'categories', 'author'],
    });
    return articles;
  }

  getOneArticle(articleId: number): Promise<ArticleEntity> {
    return this.articleRepo.findOneOrFail(articleId, {
      relations: ['comments', 'categories', 'author'],
    });
  }

  async createArticle(articleDto: ArticleDto, userEmail: string): Promise<ArticleEntity> {
    const articleToCreate: ArticleEntity = { ...articleDto };
    articleToCreate.author = await this.userService.getOneUserByEmail(userEmail);
    articleToCreate.categories = await this.categoryIdsToEntities(articleDto.categoryIds);
    return this.articleRepo.save(articleToCreate);
  }

  async updateArticle(articleId: number, articleDto: ArticleDto): Promise<ArticleEntity> {
    await this.articleRepo.findOneOrFail(articleId);
    const categoryIds = [...articleDto.categoryIds];
    delete articleDto.categoryIds;

    const articleDtoWithPayload: ArticleEntity = {
      editedAt: new Date(),
      ...articleDto,
    };
    await this.articleRepo.update(articleId, articleDtoWithPayload);
    const articleUpdated = await this.articleRepo.findOneOrFail(articleId);
    articleUpdated.categories = await this.categoryIdsToEntities(categoryIds);
    return await this.articleRepo.save(articleUpdated);
  }

  async removeArticle(articleId: number): Promise<ArticleEntity> {
    const article = await this.articleRepo.findOneOrFail(articleId, { relations: ['comments'] });
    for (const com of article.comments) {
      await this.commentService.removeComment(com.id);
    }
    return this.articleRepo.remove(article);
  }

  // private
  private async categoryIdsToEntities(catIds: number[]): Promise<CategoryEntity[]> {
    const entities: CategoryEntity[] = [];
    for (const catId of catIds) {
      const entity = await this.catService.getOneCategory(catId);
      entities.push(entity);
    }
    return entities;
  }
}
