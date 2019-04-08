import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentDto } from 'src/models/comment/comment.dto';
import { CommentEntity } from 'src/models/comment/comment.entity';
import { Repository } from 'typeorm';

import { ArticleService } from '../article/article.service';
import { UserService } from '../user/user.service';

@Injectable()
export class CommentService {

  constructor(
    @InjectRepository(CommentEntity) private readonly commentRepo: Repository<CommentEntity>,
    private readonly articleService: ArticleService,
    private readonly userService: UserService,
  ) { }


  async createComment(articleId: number, commentDto: CommentDto, userEmail: string): Promise<CommentEntity> {
    const article = await this.articleService.getOneArticle(articleId);
    const comment = new CommentEntity();
    comment.article = article;
    comment.message = commentDto.message;
    comment.author = (await this.userService.getOneUserByEmail(userEmail)).username;
    const createdComment = await this.commentRepo.save(comment);
    return this.getOneComment(createdComment.id);
  }

  async getComments(articleId: number, page: number, take: number): Promise<CommentEntity[]> {
    const article = await this.articleService.getOneArticle(articleId);
    if (article) {
      return article.comments;
    }
  }

  async getOneComment(commentId: number) {
    return this.commentRepo.findOneOrFail(commentId, {
      relations: ['article']
    });
  }

  async updateComment(commentId: number, commentDto: CommentDto): Promise<CommentEntity> {
    const comment = await this.commentRepo.findOneOrFail(commentId);
    const commentDtoWithPayload: CommentEntity = {
      editedAt: new Date(),
      ...commentDto
    };
    await this.commentRepo.update(commentId, commentDtoWithPayload);
    return await this.commentRepo.findOneOrFail(commentId);
  }

  async removeComment(commentId: number): Promise<CommentEntity> {
    const comment = await this.commentRepo.findOneOrFail(commentId);
    return this.commentRepo.remove(comment);
  }

}
