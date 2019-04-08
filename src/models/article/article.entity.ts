import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { CategoryEntity } from '../category/category.entity';
import { CommentEntity } from '../comment/comment.entity';

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

  @Column({ default: 'Mustapha AOUAS' })
  author?: string;

  @Column({ default: 0 })
  claps?: number;

  @Column({ default: 0 })
  views?: number;

  @OneToMany(type => CommentEntity, comment => comment.article)
  comments?: CommentEntity[];

  @ManyToMany(type => CategoryEntity, category => category.Articles)
  @JoinTable({ name: 'article_categories' })
  categories?: CategoryEntity[];

}
