import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from './entities/task.entity';
import { DailyPlanEntity } from '../daily-plans/entities/daily-plan.entity';
import { AiModule } from '../ai/ai.module';
import { DailyPlansService } from '../daily-plans/daily-plans.service';
import { TaskCategoriesModule } from '../task-categories/task-categories.module';
import { NotificationsModule } from '../notifications/notifications.module';
import { TasksCheduler } from './tasks.scheduler';

@Module({
  imports: [
    TypeOrmModule.forFeature([TaskEntity, DailyPlanEntity]),
    AiModule,
    TaskCategoriesModule,
    NotificationsModule
  ],
  controllers: [TasksController],
  providers: [TasksService, TasksCheduler],
  exports: [TasksService]
})
export class TasksModule {}
