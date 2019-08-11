import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { CategoryEntity } from '../category/category.entity';
import { CommentEntity } from '../comment/comment.entity';
import { UserEntity } from '../user/user.entity';

@Entity('articles')
export class ArticleEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  title?: string;

  @Column({ type: 'text' })
  body?: string;

  @CreateDateColumn()
  createdAt?: Date;

  @Column({ nullable: true })
  editedAt?: Date;

  @Column({ default: true })
  published?: boolean;

  @Column({ default: 0 })
  claps?: number;

  @Column({ default: 0 })
  views?: number;

  @OneToMany(type => CommentEntity, comment => comment.article)
  comments?: CommentEntity[];

  @ManyToOne(type => UserEntity, user => user.articles)
  author?: UserEntity;

  @ManyToMany(type => CategoryEntity, category => category.articles)
  @JoinTable({ name: 'article_categories' })
  categories?: CategoryEntity[];
}
