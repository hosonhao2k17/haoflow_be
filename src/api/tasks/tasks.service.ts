import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from './entities/task.entity';
import { In, Repository } from 'typeorm';
import { DailyPlanEntity } from '../daily-plans/entities/daily-plan.entity';
import { plainToInstance } from 'class-transformer';
import { TaskRdo } from './rdo/task.rdo';
import { constrainedMemory } from 'process';
import { SortOrder, TaskStatus } from 'src/common/constants/app.constant';
import { ReorderTaskDto } from './dto/reorder-task.dto';
import { ErrorCode } from 'src/common/constants/error-code.constant';
import { requestContext } from 'src/common/context/request.context';
import { RemoveMultiTaskDto } from './dto/remove-multi-task.dto';
import { SummaryTaskRdo } from './rdo/summary-task.rdo';
import { AiService } from '../ai/ai.service';

@Injectable()
export class TasksService {

  constructor(
    @InjectRepository(TaskEntity) private tasksRepository: Repository<TaskEntity>,
    @InjectRepository(DailyPlanEntity) private dailyPlansRepository: Repository<DailyPlanEntity>,
    private aiService: AiService
  ) {}
  async create(createTaskDto: CreateTaskDto): Promise<TaskRdo> {
    const task = this.tasksRepository.create(createTaskDto);
    const orderIndexExists = await this.tasksRepository.findOne({
      where: {dailyPlanId: createTaskDto.dailyPlanId}
    })
    await task.save()
    return plainToInstance(TaskRdo, task);
  }

  async reorder(dto: ReorderTaskDto[]) {
    
  }

  async getSummaryTask(dailyPlanId: string): Promise<SummaryTaskRdo> {
    const tasks = await this.tasksRepository.find({
      where: { dailyPlanId },
    });

    const totalTask = tasks.length;

    const completedTasks = tasks.filter(
      (item) => item.status === TaskStatus.DONE,
    ).length;

    const progressPercent =
      totalTask === 0
        ? 0
        : Math.round((completedTasks / totalTask) * 100);

    return plainToInstance(SummaryTaskRdo, {
      totalTask,
      completedTasks,
      progressPercent,
    });
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
  
  async evaluateTask(id: string) {
    const context = requestContext.getStore()
    const task = await this.tasksRepository.findOneBy({id});
    if(!task) {
      throw new NotFoundException(ErrorCode.TASK_NOT_FOUND)
    }
    
  }

  async findOne(id: string) :Promise<TaskRdo> {
    const context = requestContext.getStore()
    const task = await this.tasksRepository.findOneBy({id, createdBy: context?.userId});
    if(!task) {
      throw new NotFoundException(ErrorCode.TASK_NOT_FOUND)
    }
    return plainToInstance(TaskRdo, task)
  }

  async remove(id: string) :Promise<void> {
    await this.findOne(id);
    await this.tasksRepository.delete(id)
  }

  async removeMulti(dto: RemoveMultiTaskDto): Promise<void> {
    const tasks = await this.tasksRepository.find({
      where: {
        id: In(dto.ids)
      }
    })
    await this.tasksRepository.remove(tasks);
  }
}
