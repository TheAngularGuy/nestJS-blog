import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

import { ArticleEntity } from '../article/article.entity';

@Entity('categories')
export class CategoryEntity {

  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ unique: true })
  title?: string;

  @Column({ type: 'text', default: '' })
  body?: string;

  @ManyToMany(type => ArticleEntity, article => article.categories)
  articles?: ArticleEntity[];

}
