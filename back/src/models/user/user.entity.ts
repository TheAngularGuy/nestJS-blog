import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
