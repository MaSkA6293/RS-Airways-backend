import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const dbConfig = () => {
  return {
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: +process.env.POSTGRES_PORT,
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    synchronize: true,
    logging: true,
    subscribers: [],
    migrations: ['dist/**/migrations/*.js'],
    migrationsRun: true,
    autoLoadEntities: true,
  } as TypeOrmModuleOptions;
};

export default dbConfig;
