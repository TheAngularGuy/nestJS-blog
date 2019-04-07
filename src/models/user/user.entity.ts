import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UserEntity {

  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name?: string;

  @Column({ default: '' })
  avatar?: string;

  @Column({ unique: true })
  email?: string;

  @Column()
  salt?: string;

  @Column({ select: false })
  password?: string;

}
