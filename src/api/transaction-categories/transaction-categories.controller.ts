import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TransactionCategoriesService } from './transaction-categories.service';
import { CreateTransactionCategoryDto } from './dto/create-transaction-category.dto';
import { UpdateTransactionCategoryDto } from './dto/update-transaction-category.dto';
import { TransactionCategoryRdo } from './rdo/transaction-category.rdo';
import { ApiBearerAuth } from '@nestjs/swagger';
import { QueryTransactionCategoryDto } from './dto/query-transaction-category.dto';

@Controller('transaction-categories')
export class TransactionCategoriesController {
  constructor(private readonly transactionCategoriesService: TransactionCategoriesService) {}

  @Post()
  @ApiBearerAuth()
  create(@Body() createTransactionCategoryDto: CreateTransactionCategoryDto) :Promise<TransactionCategoryRdo> {
    return this.transactionCategoriesService.create(createTransactionCategoryDto);
  }

  @Get()
  @ApiBearerAuth()
  findAll(@Query() queryDto: QueryTransactionCategoryDto) {
    return this.transactionCategoriesService.findAll(queryDto);
  }

  @Get(':id')
  @ApiBearerAuth()
  findOne(@Param('id') id: string) {
    return this.transactionCategoriesService.findOne(+id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() updateTransactionCategoryDto: UpdateTransactionCategoryDto) {
    return this.transactionCategoriesService.update(+id, updateTransactionCategoryDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.transactionCategoriesService.remove(+id);
  }
}
