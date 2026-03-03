import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TransactionEntity } from './entities/transaction.entity';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { TransactionRdo } from './rdo/transaction.rdo';

@Injectable()
export class TransactionsService {

  constructor(
    @InjectRepository(TransactionEntity) private transactionsRepository: Repository<TransactionEntity>
  ) {}

  async create(createTransactionDto: CreateTransactionDto) :Promise<TransactionRdo> {
    const transaction = await this.transactionsRepository.create(createTransactionDto).save()
    return plainToInstance(TransactionRdo, transaction)
  }

  findAll() {
    return `This action returns all transactions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }
}
