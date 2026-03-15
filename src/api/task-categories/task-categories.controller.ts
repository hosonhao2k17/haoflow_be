import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { TaskCategoriesService } from './task-categories.service';
import { CreateTaskCategoryDto } from './dto/create-task-category.dto';
import { UpdateTaskCategoryDto } from './dto/update-task-category.dto';
import { ApiEndpoint } from 'src/decorators/http.decorator';
import { OffsetPaginatedRdo } from 'src/common/rdo/offset-paginated.rdo';
import { TaskCategoryRdo } from './rdo/task-catgory.rdo';
import { QueryTaskCategoryDto } from './dto/query-task-category.dto';

@Controller('task-categories')
export class TaskCategoriesController {
  constructor(private readonly taskCategoriesService: TaskCategoriesService) {}

  @Post()
  @ApiEndpoint({ responseType: TaskCategoryRdo })
  create(@Body() createTaskCategoryDto: CreateTaskCategoryDto) {
    return this.taskCategoriesService.create(createTaskCategoryDto);
  }

  @Get()
  @ApiEndpoint()
  findAll(@Query() queryTaskCategoryDto: QueryTaskCategoryDto) {
    return this.taskCategoriesService.findAll(queryTaskCategoryDto)
  }

  @Get(':id')
  @ApiEndpoint({ responseType: TaskCategoryRdo })
  findOne(@Param('id') id: string) {
    return this.taskCategoriesService.findOne(id);
  }

  @Patch(':id')
  @ApiEndpoint({ responseType: TaskCategoryRdo })
  update(@Param('id') id: string, @Body() updateTaskCategoryDto: UpdateTaskCategoryDto) {
    return this.taskCategoriesService.update(id, updateTaskCategoryDto);
  }

  @Delete(':id')
  @ApiEndpoint({ httpCode: HttpStatus.NO_CONTENT })
  remove(@Param('id') id: string) {
    return this.taskCategoriesService.remove(id);
  }
}
