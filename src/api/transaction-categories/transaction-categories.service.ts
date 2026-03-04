import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransactionCategoryDto } from './dto/create-transaction-category.dto';
import { UpdateTransactionCategoryDto } from './dto/update-transaction-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TransactionCategoryEntity } from './entities/transaction-category.entity';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { TransactionCategoryRdo } from './rdo/transaction-category.rdo';
import { QueryTransactionCategoryDto } from './dto/query-transaction-category.dto';
import { OffsetPaginationRdo } from 'src/common/rdo/offset-pagination.rdo';
import { OffsetPaginatedRdo } from 'src/common/rdo/offset-paginated.rdo';
import { requestContext } from 'src/common/context/request.context';
import { ErrorCode } from 'src/common/constants/error-code.constant';

@Injectable()
export class TransactionCategoriesService {

  constructor(
    @InjectRepository(TransactionCategoryEntity) private transactionCategoriesRepository: Repository<TransactionCategoryEntity>
  ) {

  }

  async create(createTransactionCategoryDto: CreateTransactionCategoryDto) :Promise<TransactionCategoryRdo> {
    const transactionCategory = await this.transactionCategoriesRepository.create(createTransactionCategoryDto).save();
    return plainToInstance(TransactionCategoryRdo, transactionCategory)
  }

  async findAll(queryDto: QueryTransactionCategoryDto = new QueryTransactionCategoryDto()) :Promise<OffsetPaginatedRdo<TransactionCategoryRdo>> {
    const queryBuilder = this.transactionCategoriesRepository
      .createQueryBuilder(queryDto.getAlias())
      .leftJoinAndSelect(`${queryDto.getAlias()}.childrens`,"childrens")
      .leftJoinAndSelect('childrens.childrens',"grandChildren")
      .where(`${queryDto.getAlias()}.parent IS NULl`)
    queryDto.handleQueryBuilder(queryBuilder);

    const [items, total] = await queryBuilder.getManyAndCount();
    const pagination = new OffsetPaginationRdo(total, queryDto);

    return new OffsetPaginatedRdo(plainToInstance(TransactionCategoryRdo, items), pagination)
  }

  async findOne(id: string) :Promise<TransactionCategoryRdo> {
    const context = requestContext.getStore()
    const category = await this.transactionCategoriesRepository.findOne({
      where: {id, createdBy: context?.userId},
      relations: {
        childrens: {
          childrens: true
        }
      }
    });
    if(!category) {
      throw new NotFoundException(ErrorCode.TRANSACTION_CATEGORY_NOT_FOUND)
    }
    return plainToInstance(TransactionCategoryRdo, category)
  }

  async update(id: string, updateTransactionCategoryDto: UpdateTransactionCategoryDto) {
    const context = requestContext.getStore()
    const category = await this.transactionCategoriesRepository.findOneBy({id, createdBy: context?.userId})
    if(!category) {
      throw new NotFoundException(ErrorCode.TRANSACTION_CATEGORY_NOT_FOUND)
    }
    Object.assign(category, updateTransactionCategoryDto)
    await category.save()
    return plainToInstance(TransactionCategoryRdo, category)
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.transactionCategoriesRepository.delete(id) 
  }
}
