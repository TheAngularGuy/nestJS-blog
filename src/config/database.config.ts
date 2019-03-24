import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const DATABASE_CONFIG: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'nest-blog',
  entities: ['src/**/*.entity{.ts,.js}'],
  synchronize: true, // TODO: switch to false in prod & une migration instead !
};
