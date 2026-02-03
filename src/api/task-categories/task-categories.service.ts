import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskCategoryDto } from './dto/create-task-category.dto';
import { UpdateTaskCategoryDto } from './dto/update-task-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskCategoryEntity } from './entities/task-category.entity';
import { Repository } from 'typeorm';
import { TaskCategoryRdo } from './rdo/task-catgory.rdo';
import { plainToInstance } from 'class-transformer';
import { ErrorCode } from 'src/common/constants/error-code.constant';
import { QueryTaskCategoryDto } from './dto/query-task-category.dto';
import { OffsetPaginationDto } from 'src/common/dto/offset-pagination.dto';
import { OffsetPaginationRdo } from 'src/common/rdo/offset-pagination.rdo';
import { OffsetPaginatedRdo } from 'src/common/rdo/offset-paginated.rdo';
import { requestContext } from 'src/common/context/request.context';

@Injectable()
export class TaskCategoriesService {

  constructor(@InjectRepository(TaskCategoryEntity) private taskCategoryRepository: Repository<TaskCategoryEntity>) {}


  async create(createTaskCategoryDto: CreateTaskCategoryDto) :Promise<TaskCategoryRdo> {
   const category = await this.taskCategoryRepository
    .create(createTaskCategoryDto)
    .save()
   return plainToInstance(TaskCategoryRdo, category)
  }

  async findAll(queryTaskCategoryDto: QueryTaskCategoryDto) {
    const queryBuilder = this.taskCategoryRepository.createQueryBuilder(queryTaskCategoryDto.getAlias());
    queryTaskCategoryDto.handleQueryBuilder(queryBuilder);
    const context = requestContext.getStore()
    const userId = context?.userId;
    queryBuilder.andWhere(`${queryTaskCategoryDto.getAlias()}.createdBy = :userId`,{userId})
    const [items, total] = await queryBuilder.getManyAndCount();
    const pagination = new OffsetPaginationRdo(total, queryTaskCategoryDto);
    return new OffsetPaginatedRdo(plainToInstance(TaskCategoryRdo, items), pagination);
  }

  async findOne(id: string) :Promise<TaskCategoryRdo> {
    const category = await this.taskCategoryRepository.findOneBy({id});
    if(!category) {
      throw new NotFoundException(ErrorCode.TASK_CATEGORY_NOT_FOUND)
    }
    return plainToInstance(TaskCategoryRdo, category)
  }

  async update(id: string, updateTaskCategoryDto: UpdateTaskCategoryDto) :Promise<TaskCategoryRdo> {
    const category = await this.taskCategoryRepository.findOneBy({id});
    if(!category) {
      throw new NotFoundException(ErrorCode.TASK_CATEGORY_NOT_FOUND)
    }
    Object.assign(category, updateTaskCategoryDto);
    await category.save()
    return plainToInstance(TaskCategoryRdo, category)
  }

  async remove(id: string) :Promise<void> {
    const category = await this.taskCategoryRepository.findOneBy({id});
    if(!category) {
      throw new NotFoundException(ErrorCode.TASK_CATEGORY_NOT_FOUND)
    }
    await this.taskCategoryRepository.softDelete(id);
  }
}
