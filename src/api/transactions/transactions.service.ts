import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TransactionEntity } from './entities/transaction.entity';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { TransactionRdo } from './rdo/transaction.rdo';
import { QueryTransactionDto } from './dto/query-transaction.dto';
import { CursorPaginationRdo } from 'src/common/rdo/cursor-pagination.rdo';
import { getAfterCursor, getBeforeCursor } from 'src/utils/cursor-pagination';
import { CursorPaginatedRdo } from 'src/common/rdo/cursor-paginated.rdo';
import { ErrorCode } from 'src/common/constants/error-code.constant';
import { TransactionCategoriesService } from '../transaction-categories/transaction-categories.service';
import { AccountsService } from '../accounts/accounts.service';
import { requestContext } from 'src/common/context/request.context';

@Injectable()
export class TransactionsService {

  constructor(
    @InjectRepository(TransactionEntity) private transactionsRepository: Repository<TransactionEntity>,
    private transactionCategoriesService: TransactionCategoriesService,
    private accountsService: AccountsService
  ) {}

  async create(createTransactionDto: CreateTransactionDto) :Promise<TransactionRdo> {
    const {categoryId, accountId, ...rest} = createTransactionDto
    const [category, account] = await Promise.all([
      this.transactionCategoriesService.findOne(categoryId),
      this.accountsService.findOne(accountId)
    ])
    const transaction = await this.transactionsRepository.create({
      ...rest,
      category,
      account
    }).save()
    return plainToInstance(TransactionRdo, transaction)
  }

  async findAll(queryTransactionDto: QueryTransactionDto) :Promise<CursorPaginatedRdo<TransactionRdo>> {
    const queryBuilder = this.transactionsRepository
      .createQueryBuilder(queryTransactionDto.getAlias())
      .leftJoinAndSelect(`${queryTransactionDto.getAlias()}.category`,"category")
      .leftJoinAndSelect(`${queryTransactionDto.getAlias()}.account`,"account")
      .andWhere(`${queryTransactionDto.getAlias()}.createdBy = :createdBy`,{createdBy: requestContext.getStore()?.userId})

    queryTransactionDto.handleQueryBuilder(queryBuilder);
    const [items, total] =  await queryBuilder.getManyAndCount();

    const cursorPagination = new CursorPaginationRdo(
      queryTransactionDto.limit, 
      getAfterCursor(items),
      getBeforeCursor(items),
      total
    );

    return new CursorPaginatedRdo(plainToInstance(TransactionRdo, items), cursorPagination);
  }

  async findOne(id: string) {
    const transaction = await this.transactionsRepository.findOne({
      where: {
        id,
        createdBy: requestContext.getStore()?.userId
      },
      relations: {
        category: true,
        account: true
      }
    });
    if(!transaction) {
      throw new NotFoundException(ErrorCode.TRANSACTION_NOT_FOUND)
    }
    return plainToInstance(TransactionRdo, transaction)
  }

  async update(id: string, updateTransactionDto: UpdateTransactionDto) {
    const {categoryId, accountId, ...data} = updateTransactionDto;
    const transaction = await this.transactionsRepository.findOne({
      where: {
        id,
        createdBy: requestContext.getStore()?.userId
      },
      relations: {
        category: true,
        account: true
      }
    });
    if(!transaction) {
      throw new NotFoundException(ErrorCode.TRANSACTION_NOT_FOUND)
    }
    const [category, account] = await Promise.all([
      categoryId ? this.transactionCategoriesService.findOne(categoryId) : transaction.category,
      accountId ? this.accountsService.findOne(accountId) : transaction.account
    ])
    Object.assign(transaction, {
      ...data,
      category,
      account
    })
    await transaction.save()
    return plainToInstance(TransactionRdo, transaction)
  }

  async remove(id: string) :Promise<void> {
    await this.findOne(id);
    await this.transactionsRepository.delete(id)
  }
}
