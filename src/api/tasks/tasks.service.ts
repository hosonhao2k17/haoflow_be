import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from './entities/task.entity';
import { Repository } from 'typeorm';
import { DailyPlanEntity } from '../daily-plans/entities/daily-plan.entity';
import { plainToInstance } from 'class-transformer';
import { TaskRdo } from './rdo/task.rdo';
import { constrainedMemory } from 'process';
import { SortOrder } from 'src/common/constants/app.constant';

@Injectable()
export class TasksService {

  constructor(
    @InjectRepository(TaskEntity) private tasksRepository: Repository<TaskEntity>,
    @InjectRepository(DailyPlanEntity) private dailyPlansRepository: Repository<DailyPlanEntity>
  ) {}
  async create(createTaskDto: CreateTaskDto) {
    const task = this.tasksRepository.create({
      ...createTaskDto,
      category: {
        id: createTaskDto.categoryId
      },
      dailyPlan: {
        id: createTaskDto.dailyPlanId
      }
    });
    const orderIndexExists = await this.tasksRepository.findOne({
      where: {dailyPlan: {id: createTaskDto.dailyPlanId}},
      order: {
        orderIndex: SortOrder.DESC
      }
    })
    task.orderIndex = orderIndexExists ? orderIndexExists.orderIndex + 1 : 0
    await task.save()
    return plainToInstance(TaskRdo, task);
  }

  findAll() {
    return `This action returns all tasks`;
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
