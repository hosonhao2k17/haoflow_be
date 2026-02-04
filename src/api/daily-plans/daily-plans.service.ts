import { Injectable } from '@nestjs/common';
import { CreateDailyPlanDto } from './dto/create-daily-plan.dto';
import { UpdateDailyPlanDto } from './dto/update-daily-plan.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DailyPlanEntity } from './entities/daily-plan.entity';
import { Repository } from 'typeorm';
import { TimeBlockEntity } from './entities/time-block.entity';
import { plainToInstance } from 'class-transformer';
import { DailyPlanRdo } from './rdo/daily-plan.rdo';

@Injectable()
export class DailyPlansService {

  constructor(
    @InjectRepository(DailyPlanEntity) private dailyPlansRepository: Repository<DailyPlanEntity>,
    @InjectRepository(TimeBlockEntity) private timeBlocksRepository: Repository<TimeBlockEntity>
  ) {}
  async create(createDailyPlanDto: CreateDailyPlanDto) :Promise<DailyPlanRdo> {
    const dailyPlan = await this.dailyPlansRepository.create(createDailyPlanDto).save();
    return plainToInstance(DailyPlanRdo, dailyPlan)
  }

  findAll() {
    return `This action returns all dailyPlans`;
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
