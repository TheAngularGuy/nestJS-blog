import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleDto } from 'src/models/article/article.dto';
import { ArticleEntity } from 'src/models/article/article.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArticleService {

  constructor(
    @InjectRepository(ArticleEntity) private readonly articleRepo: Repository<ArticleEntity>,
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

  createArticle(articleDto: ArticleDto): Promise<ArticleEntity> {
    return this.articleRepo.save(articleDto);
  }

  async updateArticle(articleId: number, articleDto: ArticleDto): Promise<ArticleEntity> {
    const article = await this.articleRepo.findOneOrFail(articleId);
    const articleDtoWithPayload: ArticleEntity = {
      editedAt: new Date(),
      ...articleDto
    };
    await this.articleRepo.update(articleId, articleDtoWithPayload);
    return await this.articleRepo.findOneOrFail(articleId);
  }

  async removeArticle(articleId: number): Promise<ArticleEntity> {
    const article = await this.articleRepo.findOneOrFail(articleId);
    return this.articleRepo.remove(article);
  }

}
