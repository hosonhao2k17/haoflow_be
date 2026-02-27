import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDailyPlanDto } from './dto/create-daily-plan.dto';
import { UpdateDailyPlanDto } from './dto/update-daily-plan.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DailyPlanEntity } from './entities/daily-plan.entity';
import { In, Repository } from 'typeorm';
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
import { ValidationException } from 'src/exceptions/validation.exception';

@Injectable()
export class DailyPlansService {

  constructor(
    @InjectRepository(DailyPlanEntity) private dailyPlansRepository: Repository<DailyPlanEntity>,
    @InjectRepository(TaskEntity) private tasksRepository: Repository<TaskEntity>,
    private tasksService: TasksService
  ) {}
  async create(createDailyPlanDto: CreateDailyPlanDto) :Promise<DailyPlanRdo> {
    //unique dailyplan with userId and date
    const context = requestContext.getStore()
    const isExists = await this.dailyPlansRepository.findOneBy({
      date: createDailyPlanDto.date,
      createdBy: context?.userId
    })
    if(!isExists) {
      throw new ValidationException(ErrorCode.DAILY_PLAN_EXISTS)
    }
    const dailyPlan = await this.dailyPlansRepository.create(createDailyPlanDto).save();
    return plainToInstance(DailyPlanRdo, dailyPlan)
  }
  async findAll(queryDailyPlanDto: QueryDailyPlanDto) {
    const alias = queryDailyPlanDto.getAlias();
    const context = requestContext.getStore()
    const queryBuilder = this.dailyPlansRepository
      .createQueryBuilder(alias)
      .andWhere(`${alias}.createdBy = :userId`,{userId: context?.userId})
    queryDailyPlanDto.handleQueryBuilder(queryBuilder);
    const dailyPlans = await queryBuilder.getMany();

    const results = await Promise.all(
      dailyPlans.map(async (plan) => ({
        ...plan,
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
      }
    })
    if(!dailyPlan) {
      throw new NotFoundException(ErrorCode.DAILY_PLAN_NOT_FOUND)
    }
    const summary =  await this.tasksService.getSummaryTask(dailyPlan.id)
    return plainToInstance(DailyPlanDetailRdo, {
      ...dailyPlan,
      summary
    })
  }

  async update(id: string, updateDailyPlanDto: UpdateDailyPlanDto) {
    const dailyPlan = await this.dailyPlansRepository.findOneBy({id});
    if(!dailyPlan) {
      throw new NotFoundException(ErrorCode.DAILY_PLAN_NOT_FOUND)
    }
    Object.assign(dailyPlan, updateDailyPlanDto);
    await dailyPlan.save()
    return plainToInstance(DailyPlanRdo, dailyPlan)
  }

  async remove(id: string) {
    const dailyPlan = await this.dailyPlansRepository.findOneBy({id});
    if(!dailyPlan) {
      throw new NotFoundException(ErrorCode.DAILY_PLAN_NOT_FOUND)
    }
    await this.dailyPlansRepository.delete(id)
  }
}
