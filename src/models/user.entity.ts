import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UserEntity {

  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name?: string;

  @Column({ default: '' })
  avatar?: string;

  @Column()
  email?: string;

  @Column({ select: false })
  password?: string;

  @BeforeInsert()
  hashPassword() {
    // TODO: add salt !
  }

}
