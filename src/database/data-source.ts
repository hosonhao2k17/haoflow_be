import { DataSource } from 'typeorm';
import { Seeder, SeederOptions } from 'typeorm-extension';
import { DataSourceOptions } from 'typeorm';
import 'dotenv/config';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/migrations/*.js'],
  seeds: ['dist/database/seeds/*.js'],
  factories: ['dist/database/factories/*.js'],

} as SeederOptions & DataSourceOptions);














