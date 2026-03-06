import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from './entities/task.entity';
import { DailyPlanEntity } from '../daily-plans/entities/daily-plan.entity';
import { AiModule } from '../ai/ai.module';
import { DailyPlansService } from '../daily-plans/daily-plans.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TaskEntity, DailyPlanEntity]), AiModule
  ],
  controllers: [TasksController],
  providers: [TasksService],
  exports: [TasksService]
})
export class TasksModule {}
