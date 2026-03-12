import { Module } from '@nestjs/common';
import { BudgetsService } from './budgets.service';
import { BudgetsController } from './budgets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BudgetEntity } from './entities/budget.entity';
import { TransactionCategoriesModule } from '../transaction-categories/transaction-categories.module';
import { TransactionEntity } from '../transactions/entities/transaction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BudgetEntity, TransactionEntity]), TransactionCategoriesModule],
  controllers: [BudgetsController],
  providers: [BudgetsService],
})
export class BudgetsModule {}
