import { Test, TestingModule } from '@nestjs/testing';
import { getDataSourceToken, getRepositoryToken } from '@nestjs/typeorm';

import { DataSource, Repository } from 'typeorm';

import { AuthController } from './auth.controller';
import { AuthService } from '../../services/auth/auth.service';
import { AccountService } from '../../services/account/account.service';
import { Account } from '../../entities/account.entity';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        AccountService, {
          provide: getRepositoryToken(Account),
          useClass: Repository
        },
        {
          provide: getDataSourceToken(),
          useValue: DataSource,
        },
      ]
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
