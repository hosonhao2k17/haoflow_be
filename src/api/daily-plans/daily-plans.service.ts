import { Injectable } from '@nestjs/common';
import { CreateDailyPlanDto } from './dto/create-daily-plan.dto';
import { UpdateDailyPlanDto } from './dto/update-daily-plan.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DailyPlanEntity } from './entities/daily-plan.entity';
import { Repository } from 'typeorm';
import { TimeBlockEntity } from './entities/time-block.entity';
import { plainToInstance } from 'class-transformer';
import { DailyPlanRdo } from './rdo/daily-plan.rdo';
import { QueryDailyPlanDto } from './dto/query-daily-plan.dto';
import { OffsetPaginatedRdo } from 'src/common/rdo/offset-paginated.rdo';
import { OffsetPaginationRdo } from 'src/common/rdo/offset-pagination.rdo';

@Injectable()
export class DailyPlansService {

  constructor(
    @InjectRepository(DailyPlanEntity) private dailyPlansRepository: Repository<DailyPlanEntity>,
    @InjectRepository(TimeBlockEntity) private timeBlocksRepository: Repository<TimeBlockEntity>
  ) {}
  async create(createDailyPlanDto: CreateDailyPlanDto) :Promise<DailyPlanRdo> {
    const timeBlock = await this.timeBlocksRepository.create(createDailyPlanDto.timeBlock).save()
    const dailyPlan = await this.dailyPlansRepository.create({
      ...createDailyPlanDto,
      timeBlock
    }).save();
    return plainToInstance(DailyPlanRdo, dailyPlan)
  }

  async findAll(queryDailyPlanDto: QueryDailyPlanDto) {
    const alias = queryDailyPlanDto.getAlias()
    const queryBuilder = this.dailyPlansRepository
      .createQueryBuilder(alias)
      .leftJoinAndSelect(`${alias}.timeBlock`,'timeBlock')
    queryDailyPlanDto.handleQueryBuilder(queryBuilder);
    const [items, total] = await queryBuilder.getManyAndCount();
    const pagination = new OffsetPaginationRdo(total, queryDailyPlanDto);

    return new OffsetPaginatedRdo(plainToInstance(DailyPlanRdo, items), pagination)
  }

  findOne(id: number) {
    return `This action returns a #${id} dailyPlan`;
  }

  update(id: number, updateDailyPlanDto: UpdateDailyPlanDto) {
    return `This action updates a #${id} dailyPlan`;
  }

  remove(id: number) {
    return `This action removes a #${id} dailyPlan`;
  }
}
