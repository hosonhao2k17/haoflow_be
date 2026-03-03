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

  findAll() {
    return `This action returns all budgets`;
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
