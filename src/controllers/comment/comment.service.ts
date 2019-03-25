import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentDto } from 'src/models/comment.dto';
import { CommentEntity } from 'src/models/comment.entity';
import { Repository } from 'typeorm';

import { ArticleService } from '../article/article.service';

@Injectable()
export class CommentService {

  constructor(
    @InjectRepository(CommentEntity) private readonly commentRepo: Repository<CommentEntity>,
    private readonly articleService: ArticleService
  ) { }


  async createComment(articleId: number, commentDto: CommentDto): Promise<CommentEntity> {
    const article = await this.articleService.getOneArticle(articleId);
    const comment = new CommentEntity();
    comment.article = article;
    comment.message = commentDto.message;
    return this.commentRepo.save(comment);
  }

  async getComments(articleId: number, page: number, take: number): Promise<CommentEntity[]> {
    const article = await this.articleService.getOneArticle(articleId);
    return article.comments;
  }

  async getOneComment(commentId: number) {
    return this.commentRepo.findOne(commentId);
  }

  async updateComment(commentId: number, commentDto: CommentDto): Promise<CommentEntity> {
    const comment = await this.commentRepo.findOne(commentId);
    if (!comment) { return null; }
    const commentDtoWithPayload: CommentEntity = {
      editedAt: new Date(),
      ...commentDto
    };
    await this.commentRepo.update(commentId, commentDtoWithPayload);
    return await this.commentRepo.findOne(commentId);
  }

  async removeComment(commentId: number): Promise<CommentEntity> {
    const comment = await this.commentRepo.findOne(commentId);
    if (!comment) { return null; }
    return this.commentRepo.remove(comment);
  }

}
