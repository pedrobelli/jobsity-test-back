import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';

import { DataSource, FindManyOptions, IsNull, Repository } from 'typeorm';

import { Task } from '../../entities/task.entity';
import { PaginatedResultDto } from '../../shared/dto/paginated-result.dto';
import { CreateTaskDto } from '../../shared/dto/create-task.dto';
import { UpdateTaskDto } from '../../shared/dto/update-task.dto';
import { Status } from '../../shared/enums/status';
import { PaginationDto } from '../../shared/dto/pagination.dto';
import { RequestInfoProvider } from '../../providers/request-info/request-info.provider';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
      private readonly taskRepository: Repository<Task>,
    @InjectDataSource() private dataSource: DataSource,
  ) { }

  async getDataTable(paginationDto: PaginationDto, accountId: number): Promise<PaginatedResultDto<Task[]>> {
    const options: FindManyOptions = {
      where: {
        accountId,
        deletedAt: IsNull(),
      }
    };
    const count =  await this.taskRepository.count(options);

    options.take = paginationDto.take;
    options.skip = paginationDto.skip;
    const tasks =  await this.taskRepository.find(options);

    return {
      totalCount: count,
      data: tasks
    }
  }

  async getById(id: number): Promise<Task> {
    return this.taskRepository.findOne({
      where: { id },
    });
  }

  validateTask(task: Task) {
    if (!task.title || !Object.values(Status).includes(+task.status)) {
      throw new HttpException('This data is not valid.', HttpStatus.BAD_REQUEST);
    }
  }

  async create(taskDto: CreateTaskDto, accountId: number): Promise<Task> {
    const task = new Task();
    task.title = taskDto.title;
    task.status = taskDto.status;
    task.accountId = accountId;
    task.updatedAt = new Date();

    this.validateTask(task);

    return await this.taskRepository.save(task);
  }

  async update(id: number, taskDto: UpdateTaskDto) {
    const task = await this.getById(id);

    if (task.status === Status.COMPLETED) {
      throw new HttpException('Completed tasks can\'t be updated.', HttpStatus.BAD_REQUEST);
    }

    task.title = taskDto.title;
    task.status = taskDto.status;
    task.updatedAt = new Date();

    this.validateTask(task);

    this.taskRepository.update(task.id, task);
  }

  async delete(id: number) {
    const task = await this.getById(id);

    if (task.status === Status.COMPLETED) {
      throw new HttpException('Completed tasks can\'t be deleted.', HttpStatus.BAD_REQUEST);
    }

    if (task.deletedAt !== null) {
      throw new HttpException('Task was already deleted.', HttpStatus.BAD_REQUEST);
    }

    task.deletedAt = new Date();

    this.taskRepository.update(task.id, task);
  }

  async batchStatusUpdate(tasksIds: number[], status: Status) {
    if (tasksIds.length === 0) {
      throw new HttpException('No tasks selected for status update.', HttpStatus.BAD_REQUEST);
    }

    const query = this.dataSource
      .createQueryBuilder()
      .update(Task)
      .set({
        status: status,
      })
      .where(`id IN (:...tasksIds)`, { tasksIds });

    return query.execute();
  }
}
