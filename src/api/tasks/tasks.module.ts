import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from './entities/task.entity';
import { DailyPlanEntity } from '../daily-plans/entities/daily-plan.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity, DailyPlanEntity])],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
