import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';

import { Task } from '../../entities/task.entity';
import { TaskBatchStatusUpdateDto } from '../../shared/dto/task-batch-status-update.dto';
import { PaginatedResultDto } from '../../shared/dto/paginated-result.dto';
import { CreateTaskDto } from '../../shared/dto/create-task.dto';
import { UpdateTaskDto } from '../../shared/dto/update-task.dto';
import { PaginationDto } from '../../shared/dto/pagination.dto';
import { Status } from '../../shared/enums/status';
import { TaskService } from '../../services/task/task.service';

import { RequestInfoProvider } from 'src/providers/request-info/request-info.provider';

@Controller('tasks')
export class TaskController {
  constructor (
    private taskService: TaskService,
    private context: RequestInfoProvider,
  ) {}

  @Get()
  async getDataTable(@Query() paginationDto: PaginationDto): Promise<PaginatedResultDto<Task[]>> {
    return this.taskService.getDataTable(paginationDto, this.context.accountId);
  }

  @Get(':id')
  async getById(@Param('id') id: number): Promise<Task> {
    return this.taskService.getById(id);
  }

  @Post()
  async create(@Body() taskDto: CreateTaskDto) {
    return this.taskService.create(taskDto, this.context.accountId);
  }

  @Put('batch-complete')
  async batchComplete(@Body() batchUpdateDto: TaskBatchStatusUpdateDto) {
    return this.taskService.batchStatusUpdate(batchUpdateDto.tasksIds, Status.COMPLETED);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() taskDto: UpdateTaskDto) {
    this.taskService.update(id, taskDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.taskService.delete(id);
  }
}
