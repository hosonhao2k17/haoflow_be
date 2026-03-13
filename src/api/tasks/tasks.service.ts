import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from './entities/task.entity';
import { Between, Equal, In, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
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
import { CreateMultiTaskDto } from './dto/create-multi-task.dto';
import { SuggestTaskDto } from './dto/suggest-task.dto';
import { classToTypeString } from 'src/utils/handle-object';
import { Priority } from 'src/common/constants/priority.constant';
import { TaskCategoriesService } from '../task-categories/task-categories.service';
import { SuggestTaskRdo } from './rdo/suggest-task.rdo';
import { AiDto } from '../ai/dto/ai.dto';
import { NotificationsService } from '../notifications/notifications.service';
import { StatsTaskRdo } from './rdo/stats-task.rdo';
import { QueryTaskStatsDto } from './dto/query-task-stats.dto';

@Injectable()
export class TasksService {

  constructor(
    @InjectRepository(TaskEntity) private tasksRepository: Repository<TaskEntity>,
    @InjectRepository(DailyPlanEntity) private dailyPlansRepository: Repository<DailyPlanEntity>,
    private aiService: AiService,
    private taskCategoriesSevice: TaskCategoriesService,
    private notificationsService: NotificationsService
  ) {}

  async stats(dto: QueryTaskStatsDto) : Promise<StatsTaskRdo> {
    const tasks = await this.tasksRepository.find({
      where: {
        createdBy: requestContext.getStore()?.userId,
        createdAt: Between(dto.getRange().start, dto.getRange().end)
      }
    });
    const total = tasks.length;
    const done = tasks.reduce((total, item) => {
      return  item.status === TaskStatus.DONE
      ?
      total + 1
      :
      total
    },0)

    const skipped = tasks.reduce((total, item) => {
      return  item.status === TaskStatus.SKIPPED
      ?
      total + 1
      :
      total
    },0)

    const todo = tasks.reduce((total, item) => {
      return  item.status === TaskStatus.TODO
      ?
      total + 1
      :
      total
    }, 0)

    const streak = await this.getCountStreak();
    return plainToInstance(StatsTaskRdo, {
      total,
      done,
      skipped,
      todo,
      streak
    })
  }

  async getCountStreak() {
    let countTaskSuccess = 0;
    let countStreak = 0;
    const dailyPlans = await this.dailyPlansRepository.find({
      where: {
        createdBy: requestContext.getStore()?.userId
      },
      relations: {
        tasks: true
      }
    })
    for(const item of dailyPlans) {
      for(const task of item.tasks) {
        if(task.status === TaskStatus.DONE) {
          countTaskSuccess++;
        }
      }
      if(countTaskSuccess === item.tasks.length) {
        countStreak++;
      }
      countTaskSuccess = 0;

    }
    return countStreak;
  }


  async create(createTaskDto: CreateTaskDto): Promise<TaskRdo> {
    const dailyPlan = await this.dailyPlansRepository.findOneBy({
      id: createTaskDto.dailyPlanId, 
      createdBy: requestContext.getStore()?.userId
    })
    if(!dailyPlan) {
      throw new NotFoundException(ErrorCode.DAILY_PLAN_NOT_FOUND)
    }
    const task = this.tasksRepository.create(createTaskDto);
    await task.save()
    if(task.isAlarm) {
      await this.notificationsService.scheduleAlarm({
        startTime: task.startTime,
        date: dailyPlan.date,
        title: task.todo,
        id: task.id 
      })
    }
    return plainToInstance(TaskRdo, task);
  }

  async createMultiTask(dto: CreateMultiTaskDto) {
    const tasks = dto.tasks.map((task) => this.tasksRepository.create({
      ...task,
      dailyPlanId: dto.dailyPlanId
    }))
    await this.tasksRepository.insert(tasks)
    return plainToInstance(TaskRdo, tasks )
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
  
  async taskSugget(dto: SuggestTaskDto) {

    const result = await this.aiService.generateAiContent({
      module: "task",
      message: `
        tạo danh sách task (phải tạo nhiều hơn 10) với yêu cầu 
        ${dto.prompt} lưu ý startTime và dateTime là kiểu time "00:00"
        Phải chọn phù hợp danh mục mà trong data tôi đưa ra chọn categoryId sao cho đúng
      `,
      typeString: classToTypeString({
        todo: "",
        description: "",
        priority: Priority,
        startTime: "",
        endTime: "",
        status: TaskStatus,
        categoryId: "",
      }),
      data: {
        categories: await this.taskCategoriesSevice.findAll(),

      }
    })
    const { data, ...rest} = this.aiService.extractJson(result)
    return plainToInstance(AiDto, {
      ...rest,
      data: plainToInstance(SuggestTaskRdo, data)
    })
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
