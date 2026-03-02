import { Module } from '@nestjs/common';
import { TransactionCategoriesService } from './transaction-categories.service';
import { TransactionCategoriesController } from './transaction-categories.controller';

@Module({
  controllers: [TransactionCategoriesController],
  providers: [TransactionCategoriesService],
})
export class TransactionCategoriesModule {}
