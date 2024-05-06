import { DataSource } from 'typeorm';
import 'dotenv/config'
import { join } from 'path';

export const connectionSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: +process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  migrations: [join(__dirname, '/../', 'migrations/*.ts')],
  synchronize: false,
  migrationsTableName: 'typeorm_migrations',
  migrationsRun: false,
  logging: false,
});