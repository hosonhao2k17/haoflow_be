import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { QueryTransactionDto } from './dto/query-transaction.dto';
import { CursorPaginatedRdo } from 'src/common/rdo/cursor-paginated.rdo';
import { TransactionRdo } from './rdo/transaction.rdo';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  @ApiBearerAuth()
  create(@Body() createTransactionDto: CreateTransactionDto) :Promise<TransactionRdo> {
    return this.transactionsService.create(createTransactionDto);
  }

  @Get()
  @ApiBearerAuth()
  findAll(@Query() queryTransactionDto: QueryTransactionDto) :Promise<CursorPaginatedRdo<TransactionRdo>> {
    return this.transactionsService.findAll(queryTransactionDto);
  }

  @Get(':id')
  @ApiBearerAuth()
  findOne(@Param('id') id: string) :Promise<TransactionRdo> {
    return this.transactionsService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() updateTransactionDto: UpdateTransactionDto): Promise<TransactionRdo>{
    return this.transactionsService.update(id, updateTransactionDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth()
  remove(@Param('id') id: string) :Promise<void> {
    return this.transactionsService.remove(id);
  }
}
