import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
  likes?: number;

  @Column({ default: 0 })
  views?: number;

}
