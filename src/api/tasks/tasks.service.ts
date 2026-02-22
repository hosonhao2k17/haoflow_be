import { Injectable, NotFoundException } from '@nestjs/common';
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
import { ReorderTaskDto } from './dto/reorder-task.dto';
import { ErrorCode } from 'src/common/constants/error-code.constant';
import { requestContext } from 'src/common/context/request.context';

@Injectable()
export class TasksService {

  constructor(
    @InjectRepository(TaskEntity) private tasksRepository: Repository<TaskEntity>,
    @InjectRepository(DailyPlanEntity) private dailyPlansRepository: Repository<DailyPlanEntity>
  ) {}
  async create(createTaskDto: CreateTaskDto): Promise<TaskRdo> {
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

  async reorder(dto: ReorderTaskDto[]) {
    
  }


  async update(id: string, updateTaskDto: UpdateTaskDto) :Promise<TaskRdo> {
    const context = requestContext.getStore()
    const task = await this.tasksRepository.findOneBy({id, createdBy: context?.userId});
    if(!task) {
      throw new NotFoundException(ErrorCode.TASK_NOT_FOUND)
    }
    Object.assign(task, updateTaskDto);
    await task.save()
    return plainToInstance(TaskRdo, task)
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
