import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { ArticleEntity } from '../article/article.entity';

@Entity('comments')
export class CommentEntity {

  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'text' })
  message?: string;

  @CreateDateColumn()
  createdAt?: Date;

  @Column()
  editedAt?: Date;

  @Column({ default: false })
  offensive?: boolean;

  @Column({ default: 'John DOE' })
  author?: string;

  @Column({ default: 0 })
  likes?: number;

  @Column({ default: 0 })
  dislikes?: number;

  @ManyToOne(type => ArticleEntity, article => article.comments)
  article?: ArticleEntity;

}
