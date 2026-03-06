import { Module } from '@nestjs/common';
import { DailyPlansService } from './daily-plans.service';
import { DailyPlansController } from './daily-plans.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DailyPlanEntity } from './entities/daily-plan.entity';
import { TimeBlockEntity } from './entities/time-block.entity';
import { TaskEntity } from '../tasks/entities/task.entity';
import { TasksModule } from '../tasks/tasks.module';

@Module({
  imports: [TypeOrmModule.forFeature([DailyPlanEntity, TimeBlockEntity, TaskEntity]), TasksModule],
  controllers: [DailyPlansController],
  providers: [DailyPlansService],
  exports: [DailyPlansService]
})
export class DailyPlansModule {}
