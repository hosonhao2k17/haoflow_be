import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpCode, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ReorderTaskDto } from './dto/reorder-task.dto';
import { RemoveMultiTaskDto } from './dto/remove-multi-task.dto';
import { TaskRdo } from './rdo/task.rdo';
import { QueryTaskDto } from './dto/query-task.dto';
import { CreateMultiTaskDto } from './dto/create-multi-task.dto';
import { SuggestTaskDto } from './dto/suggest-task.dto';
import { QueryTaskStatsDto } from './dto/query-task-stats.dto';
import { ApiEndpoint } from 'src/decorators/http.decorator';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}


  @Get('stats')
  @ApiBearerAuth()
  stats(@Query() dto: QueryTaskStatsDto) {
    return this.tasksService.stats(dto)
  }

  @Get('analise')
  @ApiEndpoint()
  analyze(): Promise<string> {
    return this.tasksService.analyze()
  }


  @Post()
  @ApiBearerAuth()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @Post('multi')
  @ApiBearerAuth()
  createMulti(@Body() dto: CreateMultiTaskDto) {
    return this.tasksService.createMultiTask(dto)
  }

  @Post('ai/suggest')
  @ApiBearerAuth()
  taskSuggest(@Body() suggestTask: SuggestTaskDto) {
    return this.tasksService.taskSugget(suggestTask)
  }

  @Get()
  @ApiBearerAuth()
  findAll(@Query() queryTaskDto: QueryTaskDto) {
    return this.tasksService.findAll(queryTaskDto)
  }

  @Get('current')
  @ApiBearerAuth()
  currentTask() :Promise<TaskRdo> {
    return this.tasksService.currentTask()
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
