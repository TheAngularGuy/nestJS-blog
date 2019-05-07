import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { ArticleEntity } from '../article/article.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ unique: true })
  username?: string;

  @Column({ default: '' })
  avatar?: string;

  @Column({ unique: true })
  email?: string;

  @Column({ select: false })
  salt?: string;

  @Column({ select: false })
  password?: string;

  @Column()
  firstname?: string;

  @Column()
  lastname?: string;

  @Column({ default: false })
  isAuthor?: boolean;

  @Column({ default: false })
  isAdmin?: boolean;

  @OneToMany(type => ArticleEntity, article => article.author)
  articles?: ArticleEntity[];
}
