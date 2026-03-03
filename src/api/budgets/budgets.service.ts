import { ConflictException, Injectable } from '@nestjs/common';
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

@Injectable()
export class BudgetsService {

  constructor(
    @InjectRepository(BudgetEntity) private budgetsRepository: Repository<BudgetEntity>,
    private transactionCategoriesService: TransactionCategoriesService
  ) {}

  async create(createBudgetDto: CreateBudgetDto): Promise<BudgetRdo> {
    const {categoryId, ...rest} = createBudgetDto
    const category = await this.transactionCategoriesService.findOne(categoryId)
    const isExistsMonth = await this.budgetsRepository.findOneBy({
      month: createBudgetDto.month,
      createdBy: requestContext.getStore()?.userId,
      categoryId
    })
    if(isExistsMonth) {
      throw new ConflictException(ErrorCode.BUDGET_MONTH_CONFLICT)
    }
    const budget = await this.budgetsRepository.create({
      ...rest,
      category
    }).save()

    return plainToInstance(BudgetRdo, budget);
  }

  async findAll(queryBudgetDto: QueryBudgetDto) :Promise<OffsetPaginatedRdo<BudgetRdo>> {
    const queryBuilder = this.budgetsRepository
      .createQueryBuilder(queryBudgetDto.getAlias())
      .leftJoinAndSelect(`${queryBudgetDto.getAlias()}.category`,'category')
      .andWhere(`${queryBudgetDto.getAlias()}.createdBy = :userId`,{userId: requestContext.getStore()?.userId})
    queryBudgetDto.handleQueryBuilder(queryBuilder);
    const [items, total] = await queryBuilder.getManyAndCount();
    const pagination = new OffsetPaginationRdo(total, queryBudgetDto);
    return new OffsetPaginatedRdo(plainToInstance(BudgetRdo, items),pagination)
  }

  findOne(id: number) {
    return `This action returns a #${id} budget`;
  }

  update(id: number, updateBudgetDto: UpdateBudgetDto) {
    return `This action updates a #${id} budget`;
  }

  remove(id: number) {
    return `This action removes a #${id} budget`;
  }
}
