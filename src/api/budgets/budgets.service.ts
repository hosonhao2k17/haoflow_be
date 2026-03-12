import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { UpdateBudgetDto } from './dto/update-budget.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BudgetEntity } from './entities/budget.entity';
import { Repository } from 'typeorm';
import { TransactionCategoriesService } from '../transaction-categories/transaction-categories.service';
import { plainToInstance } from 'class-transformer';
import { BudgetRdo } from './rdo/budget.rdo';
import { requestContext } from 'src/common/context/request.context';
import { ErrorCode } from 'src/common/constants/error-code.constant';
import { QueryBudgetDto } from './dto/query-budget.dto';
import { CursorPaginationRdo } from 'src/common/rdo/cursor-pagination.rdo';
import { OffsetPaginationRdo } from 'src/common/rdo/offset-pagination.rdo';
import { OffsetPaginatedRdo } from 'src/common/rdo/offset-paginated.rdo';
import { TransactionEntity } from '../transactions/entities/transaction.entity';
import { BudgetPeriod, TransactionType } from 'src/common/constants/app.constant';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, startOfYear, endOfYear } from 'date-fns';

@Injectable()
export class BudgetsService {

  constructor(
    @InjectRepository(BudgetEntity) private budgetsRepository: Repository<BudgetEntity>,
    private transactionCategoriesService: TransactionCategoriesService,
    @InjectRepository(TransactionEntity) private transactionsRepository: Repository<TransactionEntity>
  ) {}

  async create(createBudgetDto: CreateBudgetDto): Promise<BudgetRdo> {
    const {categoryId, ...rest} = createBudgetDto
    const category = await this.transactionCategoriesService.findOne(categoryId)
    const isExists = await this.isExistsMonth(createBudgetDto.month, categoryId)
    if(isExists) {
      throw new ConflictException(ErrorCode.BUDGET_MONTH_CONFLICT)
    }
    const budget = await this.budgetsRepository.create({
      ...rest,
      category
    }).save()

    return plainToInstance(BudgetRdo, budget);
  }

  private isExistsMonth(month: Date , categoryId: string) {
    return this.budgetsRepository.findOneBy({
      month,
      createdBy: requestContext.getStore()?.userId,
      categoryId
    })
    
  }

  async findAll(queryBudgetDto: QueryBudgetDto) :Promise<OffsetPaginatedRdo<BudgetRdo>> {
    const queryBuilder = this.budgetsRepository
      .createQueryBuilder(queryBudgetDto.getAlias())
      .leftJoinAndSelect(`${queryBudgetDto.getAlias()}.category`,'category')
      .andWhere(`${queryBudgetDto.getAlias()}.createdBy = :userId`,{userId: requestContext.getStore()?.userId})
    queryBudgetDto.handleQueryBuilder(queryBuilder);
    const [items, total] = await queryBuilder.getManyAndCount();
    const budgets = await Promise.all(items.map( async (item) => ({
      ...item,
      spentAmount: await this.totalSpentAmount(item.period, item.categoryId, item.month)
    })))
    const pagination = new OffsetPaginationRdo(total, queryBudgetDto);
    return new OffsetPaginatedRdo(plainToInstance(BudgetRdo, budgets),pagination)
  }

  private async totalSpentAmount(period: BudgetPeriod, categoryId: string, month: Date) {
    const {start, end} = this.getRangeTransactionDate(period, month);
    const transactions = await this.transactionsRepository
      .createQueryBuilder('transaction')
      .andWhere('transaction.createdBy = :createdBy',{createdBy: requestContext.getStore()?.userId})
      .andWhere('transaction.type = :type',{type: TransactionType.EXPENSE})
      .andWhere('transaction.transactionDate BETWEEN :start AND :end',{start, end})
      .andWhere('transaction.categoryId = :categoryId',{categoryId})
      .getMany()
    return transactions.reduce((prev, total) => {
      return prev + total.amount
    }, 0)

  }

  private getRangeTransactionDate(period: BudgetPeriod, month: Date) {
    switch (period) {
      case BudgetPeriod.MONTHLY:
        return { start: startOfMonth(month), end: endOfMonth(month) };
      case BudgetPeriod.WEEKLY:
        return { start: startOfWeek(month), end: endOfWeek(month) };
      case BudgetPeriod.YEARLY:
        return { start: startOfYear(month), end: endOfYear(month) };
    }
  }


  async findOne(id: string) {
    const budget = await this.budgetsRepository.findOne({
      where: {
        id,
        createdBy: requestContext.getStore()?.userId
      },
      relations: {
        category: true
      }
    });
    

    if(!budget) {
      throw new NotFoundException(ErrorCode.BUDGET_NOT_FOUND)
    }
    return plainToInstance(BudgetRdo, budget)
    
  }

  async update(id: string, updateBudgetDto: UpdateBudgetDto) :Promise<BudgetRdo> {
    const budget = await this.budgetsRepository.findOne({
      where: {
        id,
        createdBy: requestContext.getStore()?.userId
      },
      relations: {
        category: true
      }
    });
    if(!budget) {
      throw new NotFoundException(ErrorCode.BUDGET_NOT_FOUND)
    }
    const isExists = await this.isExistsMonth(updateBudgetDto?.month ?? budget?.month, updateBudgetDto?.categoryId ?? budget?.categoryId)
    if(isExists) {
      throw new ConflictException(ErrorCode.BUDGET_MONTH_CONFLICT)
    }
    if(updateBudgetDto.categoryId) {
      const category = await this.transactionCategoriesService.findOne(updateBudgetDto.categoryId)
      Object.assign(budget, {category})
    }
    Object.assign(budget, updateBudgetDto);
    return plainToInstance(BudgetRdo, budget)
  }
  

  async remove(id: string) {
    await this.findOne(id);
    await this.budgetsRepository.delete(id)
  }
}
