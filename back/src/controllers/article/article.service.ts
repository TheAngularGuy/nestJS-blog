import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleDto } from 'src/models/article/article.dto';
import { ArticleEntity } from 'src/models/article/article.entity';
import { CategoryEntity } from 'src/models/category/category.entity';
import { Repository } from 'typeorm';

import { CategoryService } from '../category/category.service';
import { UserService } from '../user/user.service';

@Injectable()
export class ArticleService {

  constructor(
    @InjectRepository(ArticleEntity) private readonly articleRepo: Repository<ArticleEntity>,
    private readonly userService: UserService,
    private readonly catService: CategoryService,
  ) { }

  getArticles(page = 1, take = 25): Promise<ArticleEntity[]> {
    return this.articleRepo.find({
      relations: ['comments', 'categories'],
      skip: take * (page - 1),
      take,
      order: {
        createdAt: 'DESC'
      }
    });
  }

  getOneArticle(articleId: number): Promise<ArticleEntity> {
    return this.articleRepo.findOneOrFail(articleId, {
      relations: ['comments', 'categories'],
    });
  }

  async createArticle(articleDto: ArticleDto, userEmail: string): Promise<ArticleEntity> {
    const articleToCreate: ArticleEntity = { ...articleDto };
    articleToCreate.author = (await this.userService.getOneUserByEmail(userEmail)).username;
    articleToCreate.categories = await this.categoryIdsToEntities(articleDto.categoryIds);
    return this.articleRepo.save(articleToCreate);
  }

  async updateArticle(articleId: number, articleDto: ArticleDto): Promise<ArticleEntity> {
    await this.articleRepo.findOneOrFail(articleId);
    const categoryIds = [...articleDto.categoryIds];
    delete articleDto.categoryIds;

    const articleDtoWithPayload: ArticleEntity = {
      editedAt: new Date(),
      ...articleDto
    };
    await this.articleRepo.update(articleId, articleDtoWithPayload);
    const articleUpdated = await this.articleRepo.findOneOrFail(articleId);
    articleUpdated.categories = await this.categoryIdsToEntities(categoryIds);
    return await this.articleRepo.save(articleUpdated);
  }

  async removeArticle(articleId: number): Promise<ArticleEntity> {
    const article = await this.articleRepo.findOneOrFail(articleId);
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
