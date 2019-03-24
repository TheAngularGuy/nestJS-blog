import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { CommentEntity } from './comment.entity';

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

  @Column()
  editedAt?: Date;

  @Column({ default: true })
  published?: boolean;

  @Column({ default: 'Mustapha AOUAS' })
  author?: string;

  @Column()
  tag?: string;

  @Column({ default: 0 })
  claps?: number;

  @Column({ default: 0 })
  views?: number;

  @OneToMany(type => CommentEntity, comment => comment.article)
  comments?: CommentEntity[];

}
