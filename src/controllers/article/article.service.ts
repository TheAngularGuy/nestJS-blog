import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleDto } from 'src/models/article.dto';
import { ArticleEntity } from 'src/models/article.entity';
import { CommentDto } from 'src/models/comment.dto';
import { CommentEntity } from 'src/models/comment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArticleService {

  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRepo: Repository<ArticleEntity>,
    @InjectRepository(CommentEntity)
    private readonly commentRepo: Repository<CommentEntity>,
  ) { }

  getArticles(page = 1, take = 25): Promise<ArticleEntity[]> {
    return this.articleRepo.find({
      relations: ['comments'],
      skip: take * (page - 1),
      take,
    });
  }

  getOneArticle(articleId: number): Promise<ArticleEntity> {
    return this.articleRepo.findOne(articleId, {
      relations: ['comments'],
    });
  }

  createArticle(articleDto: ArticleDto): Promise<ArticleEntity> {
    return this.articleRepo.save(articleDto);
  }

  async updateArticle(articleId: number, articleDto: ArticleDto): Promise<ArticleEntity> {
    const article = await this.articleRepo.findOne(articleId);
    if (!article) { return null; }
    const articleDtoWithPayload: ArticleEntity = {
      editedAt: new Date(),
      ...articleDto
    };
    await this.articleRepo.update(articleId, articleDtoWithPayload);
    return await this.articleRepo.findOne(articleId);
  }

  async removeArticle(articleId: number): Promise<ArticleEntity> {
    const article = await this.articleRepo.findOne(articleId);
    if (!article) { return null; }
    return this.articleRepo.remove(article);
  }

  async addComment(articleId: number, commentDto: CommentDto): Promise<CommentEntity> {
    const article = await this.getOneArticle(articleId);
    const comment = new CommentEntity();
    comment.article = article;
    comment.message = commentDto.message;
    return this.commentRepo.save(comment);
  }

}
