import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TaskCategoriesService } from './task-categories.service';
import { CreateTaskCategoryDto } from './dto/create-task-category.dto';
import { UpdateTaskCategoryDto } from './dto/update-task-category.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { OffsetPaginatedRdo } from 'src/common/rdo/offset-paginated.rdo';
import { TaskCategoryRdo } from './rdo/task-catgory.rdo';

@Controller('task-categories')
export class TaskCategoriesController {
  constructor(private readonly taskCategoriesService: TaskCategoriesService) {}

  @Post()
  @ApiBearerAuth()
  create(@Body() createTaskCategoryDto: CreateTaskCategoryDto) {
    return this.taskCategoriesService.create(createTaskCategoryDto);
  }

  @Get(':id')
  @ApiBearerAuth()
  findOne(@Param('id') id: string) {
    return this.taskCategoriesService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() updateTaskCategoryDto: UpdateTaskCategoryDto) {
    return this.taskCategoriesService.update(id, updateTaskCategoryDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.taskCategoriesService.remove(+id);
  }
}
