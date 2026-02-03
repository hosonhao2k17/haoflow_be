import { Injectable } from '@nestjs/common';
import { CreateTaskCategoryDto } from './dto/create-task-category.dto';
import { UpdateTaskCategoryDto } from './dto/update-task-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskCategoryEntity } from './entities/task-category.entity';
import { Repository } from 'typeorm';
import { TaskCategoryRdo } from './rdo/task-catgory.rdo';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class TaskCategoriesService {

  constructor(@InjectRepository(TaskCategoryEntity) private taskCategoryRepository: Repository<TaskCategoryEntity>) {}


  async create(createTaskCategoryDto: CreateTaskCategoryDto) :Promise<TaskCategoryRdo> {
   const category = await this.taskCategoryRepository
    .create(createTaskCategoryDto)
    .save()
   return plainToInstance(TaskCategoryRdo, category)
  }

  findAll() {
    return `This action returns all taskCategories`;
  }

  findOne(id: number) {
    return `This action returns a #${id} taskCategory`;
  }

  update(id: number, updateTaskCategoryDto: UpdateTaskCategoryDto) {
    return `This action updates a #${id} taskCategory`;
  }

  remove(id: number) {
    return `This action removes a #${id} taskCategory`;
  }
}
