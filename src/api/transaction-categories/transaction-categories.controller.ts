import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { TransactionCategoriesService } from './transaction-categories.service';
import { CreateTransactionCategoryDto } from './dto/create-transaction-category.dto';
import { UpdateTransactionCategoryDto } from './dto/update-transaction-category.dto';
import { TransactionCategoryRdo } from './rdo/transaction-category.rdo';
import { QueryTransactionCategoryDto } from './dto/query-transaction-category.dto';
import { ApiEndpoint } from 'src/decorators/http.decorator';

@Controller('transaction-categories')
export class TransactionCategoriesController {
  constructor(private readonly transactionCategoriesService: TransactionCategoriesService) {}

  @Post()
  @ApiEndpoint({ responseType: TransactionCategoryRdo })
  create(@Body() createTransactionCategoryDto: CreateTransactionCategoryDto) :Promise<TransactionCategoryRdo> {
    return this.transactionCategoriesService.create(createTransactionCategoryDto);
  }

  @Get()
  @ApiEndpoint()
  findAll(@Query() queryDto: QueryTransactionCategoryDto) {
    return this.transactionCategoriesService.findAll(queryDto);
  }

  @Get(':id')
  @ApiEndpoint({ responseType: TransactionCategoryRdo })
  findOne(@Param('id') id: string) :Promise<TransactionCategoryRdo> {
    return this.transactionCategoriesService.findOne(id);
  }

  @Patch(':id')
  @ApiEndpoint({ responseType: TransactionCategoryRdo })
  update(@Param('id') id: string, @Body() updateTransactionCategoryDto: UpdateTransactionCategoryDto) :Promise<TransactionCategoryRdo> {
    return this.transactionCategoriesService.update(id, updateTransactionCategoryDto);
  }

  @Delete(':id')
  @ApiEndpoint({ httpCode: HttpStatus.NO_CONTENT })
  remove(@Param('id') id: string) {
    return this.transactionCategoriesService.remove(id);
  }
}
