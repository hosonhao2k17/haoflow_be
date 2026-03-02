import { Injectable } from '@nestjs/common';
import { CreateTransactionCategoryDto } from './dto/create-transaction-category.dto';
import { UpdateTransactionCategoryDto } from './dto/update-transaction-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TransactionCategoryEntity } from './entities/transaction-category.entity';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { TransactionCategoryRdo } from './rdo/transaction-category.rdo';

@Injectable()
export class TransactionCategoriesService {

  constructor(
    @InjectRepository(TransactionCategoryEntity) private transactionCategoriesRepository: Repository<TransactionCategoryEntity>
  ) {

  }

  async create(createTransactionCategoryDto: CreateTransactionCategoryDto) :Promise<TransactionCategoryRdo> {
    const transactionCategory = await this.transactionCategoriesRepository.create(createTransactionCategoryDto).save();
    return plainToInstance(TransactionCategoryRdo, transactionCategory)
  }

  findAll() {
    return `This action returns all transactionCategories`;
  }

  findOne(id: number) {
    return `This action returns a #${id} transactionCategory`;
  }

  update(id: number, updateTransactionCategoryDto: UpdateTransactionCategoryDto) {
    return `This action updates a #${id} transactionCategory`;
  }

  remove(id: number) {
    return `This action removes a #${id} transactionCategory`;
  }
}
