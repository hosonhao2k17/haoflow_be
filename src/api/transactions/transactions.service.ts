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

@Injectable()
export class TransactionsService {

  constructor(
    @InjectRepository(TransactionEntity) private transactionsRepository: Repository<TransactionEntity>
  ) {}

  async create(createTransactionDto: CreateTransactionDto) :Promise<TransactionRdo> {
    const transaction = await this.transactionsRepository.create(createTransactionDto).save()
    return plainToInstance(TransactionRdo, transaction)
  }

  async findAll(queryTransactionDto: QueryTransactionDto) :Promise<CursorPaginatedRdo<TransactionRdo>> {
    const queryBuilder = this.transactionsRepository
      .createQueryBuilder(queryTransactionDto.getAlias())
      .leftJoinAndSelect(`${queryTransactionDto.getAlias()}.category`,"category")
      .leftJoinAndSelect(`${queryTransactionDto.getAlias()}.account`,"account")

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
        id 
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

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }
}
