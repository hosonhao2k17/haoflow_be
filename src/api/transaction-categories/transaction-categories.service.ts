import { Injectable } from '@nestjs/common';
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

  async findAll(queryDto: QueryTransactionCategoryDto) :Promise<OffsetPaginatedRdo<TransactionCategoryRdo>> {
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

  findOne(id: number) {
    return `This action returns a #${id} transactionCategory`;
  }

  update(id: number, updateTransactionCategoryDto: UpdateTransactionCategoryDto) {
    return `This action updates a #${id} transactionCategory`;
  }

  remove(id: number) {
    return `This action removes a #${id} transactionCategory`;
  }
}
