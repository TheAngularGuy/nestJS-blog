import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const DATABASE_CONFIG: TypeOrmModuleOptions = {
  type: 'postgres',
  host: '127.0.0.1',
  port: 5432, // 3306,
  username: 'local',
  password: 'local',
  database: 'nest_blog',
  entities: ['src/**/*.entity{.ts,.js}'],
  synchronize: true, // TODO: switch to false in prod & une migration instead !

  migrationsTableName: 'migrations',
  migrations: ['migration/*.js'],
  cli: {
    migrationsDir: 'migration'
  }
};
