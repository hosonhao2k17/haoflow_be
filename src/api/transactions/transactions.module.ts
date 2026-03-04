import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionEntity } from './entities/transaction.entity';
import { TransactionCategoriesModule } from '../transaction-categories/transaction-categories.module';
import { AccountsModule } from '../accounts/accounts.module';
import { AiService } from '../ai/ai.service';
import { ReceiptEntity } from './entities/receipt.entity';
import { AiModule } from '../ai/ai.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TransactionEntity, ReceiptEntity]),
    TransactionCategoriesModule,
    AccountsModule,
    AiModule
  ],
  controllers: [TransactionsController],
  providers: [TransactionsService],
})
export class TransactionsModule {}
