import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TaskService } from './task/task.service';
import { Task } from '../entities/task.entity';
import { AuthService } from './auth/auth.service';
import { AccountService } from './account/account.service';
import { Account } from '../entities/account.entity';

@Module({
  providers: [TaskService, AuthService, AccountService],
  exports: [TaskService, AuthService, AccountService],
  imports: [
    TypeOrmModule.forFeature([
      Task,
      Account
    ]),
  ]
})
export class ServicesModule {}
