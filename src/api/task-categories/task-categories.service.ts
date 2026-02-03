import { Injectable } from '@nestjs/common';
import { CreateTaskCategoryDto } from './dto/create-task-category.dto';
import { UpdateTaskCategoryDto } from './dto/update-task-category.dto';

@Injectable()
export class TaskCategoriesService {
  create(createTaskCategoryDto: CreateTaskCategoryDto) {
    return 'This action adds a new taskCategory';
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
