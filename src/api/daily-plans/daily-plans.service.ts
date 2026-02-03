import { Injectable } from '@nestjs/common';
import { CreateDailyPlanDto } from './dto/create-daily-plan.dto';
import { UpdateDailyPlanDto } from './dto/update-daily-plan.dto';

@Injectable()
export class DailyPlansService {
  create(createDailyPlanDto: CreateDailyPlanDto) {
    return 'This action adds a new dailyPlan';
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
