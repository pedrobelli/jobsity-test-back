import { Injectable } from '@nestjs/common';

import { DataSourceOptions  } from 'typeorm';

import { Task } from '../entities/task.entity';
import { Account } from '../entities/account.entity';

require('dotenv').config();

@Injectable()
export class TypeormConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];

    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach(k => this.getValue(k, true));
    return this;
  }

  public getTypeOrmConfig(): DataSourceOptions {
    return {
      name: 'default',
      type: 'postgres',
      host: this.getValue('POSTGRES_HOST'),
      port: parseInt(this.getValue('POSTGRES_PORT')),
      username: this.getValue('POSTGRES_USER'),
      password: this.getValue('POSTGRES_PASSWORD'),
      database: this.getValue('POSTGRES_DATABASE'),
      entities: [
        Task,
        Account
      ],
      synchronize: false,
      migrationsTableName: 'typeorm_migrations',
      migrationsRun: false,
      logging: false,
    };
  }
}

const Configuration = new TypeormConfigService(process.env).ensureValues([
  'POSTGRES_HOST',
  'POSTGRES_PORT',
  'POSTGRES_USER',
  'POSTGRES_PASSWORD',
  'POSTGRES_DATABASE',
]);

export { Configuration };
