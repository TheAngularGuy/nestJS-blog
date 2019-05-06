import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from 'src/models/user/user.dto';
import { UserEntity } from 'src/models/user/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>,
  ) {}

  getCount(): Promise<number> {
    return this.userRepo.count({});
  }

  getUsers(page = 1, take = 25): Promise<UserEntity[]> {
    return this.userRepo.find({
      skip: take * (page - 1),
      take,
    });
  }

  getUsersAuthors(page = 1, take = 25): Promise<UserEntity[]> {
    return this.userRepo.find({
      /* skip: take * (page - 1),
      take, */
      where: {
        isAuthor: true,
      },
    });
  }

  async getOneUserByEmail(email: string): Promise<UserEntity> {
    return await this.userRepo.findOneOrFail({
      where: {
        email,
      },
    });
  }

  async getOneUserSaltByEmail(email: string): Promise<UserEntity> {
    return await this.userRepo
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .select(['user.salt'])
      .getOne();
  }

  async getOneUserByEmailAndPassword(email: string, password: string): Promise<UserEntity> {
    return await this.userRepo.findOneOrFail({
      where: {
        email,
        password,
      },
    });
  }

  async getOneUserById(id: number): Promise<UserEntity> {
    return await this.userRepo.findOneOrFail({
      where: {
        id,
      },
    });
  }

  async createUser(user: UserDto): Promise<UserEntity> {
    return await this.userRepo.save(user);
  }

  async editUser(userId: number, user: UserDto): Promise<UserEntity> {
    await this.userRepo.findOneOrFail(userId);
    await this.userRepo.update(userId, user);
    return this.userRepo.findOneOrFail(userId);
  }
}
