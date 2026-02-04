import { Module } from '@nestjs/common';
import { DailyPlansService } from './daily-plans.service';
import { DailyPlansController } from './daily-plans.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DailyPlanEntity } from './entities/daily-plan.entity';
import { TimeBlockEntity } from './entities/time-block.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DailyPlanEntity, TimeBlockEntity])],
  controllers: [DailyPlansController],
  providers: [DailyPlansService],
})
export class DailyPlansModule {}
