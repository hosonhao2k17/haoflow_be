import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpCode } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ReorderTaskDto } from './dto/reorder-task.dto';
import { RemoveMultiTaskDto } from './dto/remove-multi-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiBearerAuth()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @Post(':id/ai-evaluate')
  @ApiBearerAuth()
  evaluateTask(@Param('id') id: string) {
    return this.tasksService.evaluateTask(id)
  }

  @Patch('reorder')
  @ApiBearerAuth()
  reorder(@Body() dto: ReorderTaskDto[]) {
    return this.tasksService.reorder(dto)
  }

  @Patch(':id')
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth()
  remove(@Param('id') id: string) :Promise<void> {
    return this.tasksService.remove(id);
  }

  @Delete()
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  removeMulti(@Body() dto: RemoveMultiTaskDto) :Promise<void> {
    return this.tasksService.removeMulti(dto)
  }
}
