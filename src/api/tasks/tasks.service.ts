import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from './entities/task.entity';
import { Equal, In, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
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
import { QueryTaskDto } from './dto/query-task.dto';
import { OffsetPaginationRdo } from 'src/common/rdo/offset-pagination.rdo';
import { OffsetPaginatedRdo } from 'src/common/rdo/offset-paginated.rdo';

@Injectable()
export class TasksService {

  constructor(
    @InjectRepository(TaskEntity) private tasksRepository: Repository<TaskEntity>,
    @InjectRepository(DailyPlanEntity) private dailyPlansRepository: Repository<DailyPlanEntity>,
    private aiService: AiService
  ) {}
  async create(createTaskDto: CreateTaskDto): Promise<TaskRdo> {
    const task = this.tasksRepository.create(createTaskDto);
    await task.save()
    return plainToInstance(TaskRdo, task);
  }

  async findAll(queryTaskDto: QueryTaskDto) {

    const queryBuilder = this.tasksRepository
      .createQueryBuilder(queryTaskDto.getAlias())
      .leftJoinAndSelect(`${queryTaskDto.getAlias()}.category`,'category')
    queryTaskDto.handleQueryBuilder(queryBuilder);

    const [items, total] = await queryBuilder.getManyAndCount();

    const pagination = new OffsetPaginationRdo(total, queryTaskDto);

    return new OffsetPaginatedRdo(plainToInstance(TaskRdo, items), pagination);
  }

  async currentTask() :Promise<TaskRdo> {
    const now = new Date()
    const currentTime = now.toTimeString().slice(0, 8);
    const currentDate = now.toISOString().split("T")[0];
    const context = requestContext.getStore()
    const task = await this.tasksRepository.findOne({
      where: {
        startTime: LessThanOrEqual(currentTime),
        endTime: MoreThanOrEqual(currentTime),
        dailyPlan: {
          date: currentDate,
          createdBy: context?.userId
        },
        
      }
    });
    
    return plainToInstance(TaskRdo, task)
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
