import { Module } from '@nestjs/common';
import { TaskCategoriesService } from './task-categories.service';
import { TaskCategoriesController } from './task-categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from '../tasks/entities/task.entity';
import { TaskCategoryEntity } from './entities/task-category.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TaskCategoryEntity])
  ],
  controllers: [TaskCategoriesController],
  providers: [TaskCategoriesService],
})
export class TaskCategoriesModule {}
