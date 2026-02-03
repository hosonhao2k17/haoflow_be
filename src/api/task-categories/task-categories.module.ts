import { Module } from '@nestjs/common';
import { TaskCategoriesService } from './task-categories.service';
import { TaskCategoriesController } from './task-categories.controller';

@Module({
  controllers: [TaskCategoriesController],
  providers: [TaskCategoriesService],
})
export class TaskCategoriesModule {}
