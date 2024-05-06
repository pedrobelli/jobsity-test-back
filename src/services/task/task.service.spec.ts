import { Test, TestingModule } from '@nestjs/testing';
import { getDataSourceToken, getRepositoryToken } from '@nestjs/typeorm';

import { DataSource, Repository } from 'typeorm';

import { TaskService } from './task.service';
import { Task } from '../../entities/task.entity';
import { RequestInfoProvider } from '../../providers/request-info/request-info.provider';

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskService, {
          provide: getRepositoryToken(Task),
          useClass: Repository
        },
        {
          provide: getDataSourceToken(),
          useValue: DataSource,
        },
      ],
    }).compile();

    service = module.get<TaskService>(TaskService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
