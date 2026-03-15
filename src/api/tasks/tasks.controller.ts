import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpCode, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
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
  @ApiEndpoint()
  stats(@Query() dto: QueryTaskStatsDto) {
    return this.tasksService.stats(dto)
  }

  @Get('analise')
  @ApiEndpoint()
  analyze(): Promise<string> {
    return this.tasksService.analyze()
  }


  @Post()
  @ApiEndpoint({ responseType: TaskRdo })
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @Post('multi')
  @ApiEndpoint()
  createMulti(@Body() dto: CreateMultiTaskDto) {
    return this.tasksService.createMultiTask(dto)
  }

  @Post('ai/suggest')
  @ApiEndpoint()
  taskSuggest(@Body() suggestTask: SuggestTaskDto) {
    return this.tasksService.taskSugget(suggestTask)
  }

  @Get()
  @ApiEndpoint()
  findAll(@Query() queryTaskDto: QueryTaskDto) {
    return this.tasksService.findAll(queryTaskDto)
  }

  @Get('current')
  @ApiEndpoint({ responseType: TaskRdo })
  currentTask() :Promise<TaskRdo> {
    return this.tasksService.currentTask()
  }

  @Patch(':id')
  @ApiEndpoint({ responseType: TaskRdo })
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Delete(':id')
  @ApiEndpoint({ httpCode: HttpStatus.NO_CONTENT })
  remove(@Param('id') id: string) :Promise<void> {
    return this.tasksService.remove(id);
  }

  @Delete()
  @ApiEndpoint({ httpCode: HttpStatus.NO_CONTENT })
  removeMulti(@Body() dto: RemoveMultiTaskDto) :Promise<void> {
    return this.tasksService.removeMulti(dto)
  }
}
