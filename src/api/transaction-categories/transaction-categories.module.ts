import { Module } from '@nestjs/common';
import { TransactionCategoriesService } from './transaction-categories.service';
import { TransactionCategoriesController } from './transaction-categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionCategoryEntity } from './entities/transaction-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TransactionCategoryEntity])],
  controllers: [TransactionCategoriesController],
  providers: [TransactionCategoriesService],
})
export class TransactionCategoriesModule {}
