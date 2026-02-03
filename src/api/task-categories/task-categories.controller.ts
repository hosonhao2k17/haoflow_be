import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TaskCategoriesService } from './task-categories.service';
import { CreateTaskCategoryDto } from './dto/create-task-category.dto';
import { UpdateTaskCategoryDto } from './dto/update-task-category.dto';

@Controller('task-categories')
export class TaskCategoriesController {
  constructor(private readonly taskCategoriesService: TaskCategoriesService) {}

  @Post()
  create(@Body() createTaskCategoryDto: CreateTaskCategoryDto) {
    return this.taskCategoriesService.create(createTaskCategoryDto);
  }

  @Get()
  findAll() {
    return this.taskCategoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskCategoriesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskCategoryDto: UpdateTaskCategoryDto) {
    return this.taskCategoriesService.update(+id, updateTaskCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskCategoriesService.remove(+id);
  }
}
