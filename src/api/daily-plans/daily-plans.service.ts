import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDailyPlanDto } from './dto/create-daily-plan.dto';
import { UpdateDailyPlanDto } from './dto/update-daily-plan.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DailyPlanEntity } from './entities/daily-plan.entity';
import { In, Repository } from 'typeorm';
import { TimeBlockEntity } from './entities/time-block.entity';
import { plainToInstance } from 'class-transformer';
import { DailyPlanRdo } from './rdo/daily-plan.rdo';
import { QueryDailyPlanDto } from './dto/query-daily-plan.dto';
import { OffsetPaginatedRdo } from 'src/common/rdo/offset-paginated.rdo';
import { OffsetPaginationRdo } from 'src/common/rdo/offset-pagination.rdo';
import { requestContext } from 'src/common/context/request.context';
import { ErrorCode } from 'src/common/constants/error-code.constant';
import { DailyPlanDetailRdo } from './rdo/daily-plan-detail.rdo';
import { SortOrder, TaskStatus } from 'src/common/constants/app.constant';
import { CursorPaginationRdo } from 'src/common/rdo/cursor-pagination.rdo';
import { getAfterCursor, getBeforeCursor } from 'src/utils/cursor-pagination';
import { CursorPaginatedRdo } from 'src/common/rdo/cursor-paginated.rdo';
import { TaskEntity } from '../tasks/entities/task.entity';
import { TasksService } from '../tasks/tasks.service';
import { RangeRdo } from 'src/common/rdo/range.rdo';
import { RangedRdo } from 'src/common/rdo/ranged.rdo';

@Injectable()
export class DailyPlansService {

  constructor(
    @InjectRepository(DailyPlanEntity) private dailyPlansRepository: Repository<DailyPlanEntity>,
    @InjectRepository(TimeBlockEntity) private timeBlocksRepository: Repository<TimeBlockEntity>,
    @InjectRepository(TaskEntity) private tasksRepository: Repository<TaskEntity>,
    private tasksService: TasksService
  ) {}
  async create(createDailyPlanDto: CreateDailyPlanDto) :Promise<DailyPlanRdo> {
    const timeBlock = await this.timeBlocksRepository.create(createDailyPlanDto.timeBlock).save()
    const dailyPlan = await this.dailyPlansRepository.create({
      ...createDailyPlanDto,
      timeBlock
    }).save();
    return plainToInstance(DailyPlanRdo, dailyPlan)
  }
  //Mỗi card trả về 5 rows tasks chưa hoàn thành
  async findAll(queryDailyPlanDto: QueryDailyPlanDto) {
    const alias = queryDailyPlanDto.getAlias();
    const context = requestContext.getStore()
    const queryBuilder = this.dailyPlansRepository
      .createQueryBuilder(alias)
      .leftJoinAndSelect(`${alias}.timeBlock`,'timeBlock')
      .andWhere(`${alias}.createdBy = :userId`,{userId: context?.userId})
    queryDailyPlanDto.handleQueryBuilder(queryBuilder);
    const [dailyPlans, total] = await queryBuilder.getManyAndCount();
    const tasks = await this.tasksRepository.find({
      where: {
        dailyPlan: {
          id: In(dailyPlans.map((item) => item.id))
        },
        status: TaskStatus.TODO
      },
      order: {
        orderIndex: 'DESC'
      }
    })
    const taskMap = new Map<string, any[]>();
    for (const task of tasks) {
      const planId = task.dailyPlanId;
      if (!taskMap.has(planId)) {
        taskMap.set(planId, []);
      }
      const list = taskMap.get(planId)!;
      if (list.length < 5) {
        list.push(task);
      }
    }

    const results = await Promise.all(
      dailyPlans.map(async (plan) => ({
        ...plan,
        tasks: taskMap.get(plan.id) ?? [],
        summary: await this.tasksService.getSummaryTask(plan.id),
      }))
    );

    const range = new RangeRdo(
      queryDailyPlanDto.startDate,
      queryDailyPlanDto.endDate,
      queryDailyPlanDto.limit
    );

    return new RangedRdo(plainToInstance(DailyPlanRdo, results), range)
  }

  async findOne(id: string) {
    const context = requestContext.getStore()
    const dailyPlan = await this.dailyPlansRepository.findOne({
      where: {
        createdBy: context?.userId,
        id
      },
      relations: {
        tasks: {
          category: true
        },
        timeBlock: true
      },
      order: {
        tasks: {
          orderIndex: SortOrder.DESC
        }
      }
    })
    if(!dailyPlan) {
      throw new NotFoundException(ErrorCode.DAILY_PLAN_NOT_FOUND)
    }

    return plainToInstance(DailyPlanDetailRdo, dailyPlan)
  }

  update(id: string, updateDailyPlanDto: UpdateDailyPlanDto) {
    return `This action updates a #${id} dailyPlan`;
  }

  remove(id: string) {
    return `This action removes a #${id} dailyPlan`;
  }
}
