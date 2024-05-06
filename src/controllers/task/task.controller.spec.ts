import { Test, TestingModule } from '@nestjs/testing';
import { getDataSourceToken, getRepositoryToken } from '@nestjs/typeorm';

import { DataSource, Repository } from 'typeorm';

import { TaskController } from './task.controller';
import { TaskService } from '../../services/task/task.service';
import { Task } from '../../entities/task.entity';
import { RequestInfoProvider } from '../../providers/request-info/request-info.provider';

describe('TaskController', () => {
  let controller: TaskController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [
        TaskService,
        RequestInfoProvider, {
          provide: getRepositoryToken(Task),
          useClass: Repository
        },
        {
          provide: getDataSourceToken(),
          useValue: DataSource,
        },
      ]
    }).compile();

    controller = module.get<TaskController>(TaskController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
