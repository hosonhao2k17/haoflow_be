import { Module } from '@nestjs/common';
import { BudgetsService } from './budgets.service';
import { BudgetsController } from './budgets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BudgetEntity } from './entities/budget.entity';
import { TransactionCategoriesModule } from '../transaction-categories/transaction-categories.module';
import { TransactionEntity } from '../transactions/entities/transaction.entity';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([BudgetEntity, TransactionEntity]), 
    TransactionCategoriesModule,
    NotificationsModule
  ],
  controllers: [BudgetsController],
  providers: [BudgetsService],
  exports: [BudgetsService]
})
export class BudgetsModule {}
