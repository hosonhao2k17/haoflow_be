import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { ApiEndpoint } from 'src/decorators/http.decorator';
import { QueryTransactionDto } from './dto/query-transaction.dto';
import { CursorPaginatedRdo } from 'src/common/rdo/cursor-paginated.rdo';
import { TransactionRdo } from './rdo/transaction.rdo';
import { CreateFromReceiptDto } from './dto/create-from-receipt.dto';
import { ReviewTransactionReceiptDto } from './dto/review-transaction-receipt.dto';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get('stats')
  @ApiEndpoint()
  stats() {
    return this.transactionsService.stats()
  }

  @Post()
  @ApiEndpoint({ responseType: TransactionRdo })
  create(@Body() createTransactionDto: CreateTransactionDto) :Promise<TransactionRdo> {
    return this.transactionsService.create(createTransactionDto);
  }

  @Post('receipt/preview')
  @ApiEndpoint()
  reviewTransactionReceipt(@Body() dto: ReviewTransactionReceiptDto) {
    return this.transactionsService.reviewTransactionReceipt(dto)
  }

  @Post('receipt')
  @ApiEndpoint()
  createFromReceipt(@Body() createDto: CreateFromReceiptDto) {
    return this.transactionsService.createFromReceipt(createDto);
  }

  @Get()
  @ApiEndpoint()
  findAll(@Query() queryTransactionDto: QueryTransactionDto) :Promise<CursorPaginatedRdo<TransactionRdo>> {
    return this.transactionsService.findAll(queryTransactionDto);
  }

  @Get(':id')
  @ApiEndpoint({ responseType: TransactionRdo })
  findOne(@Param('id') id: string) :Promise<TransactionRdo> {
    return this.transactionsService.findOne(id);
  }

  @Patch(':id')
  @ApiEndpoint({ responseType: TransactionRdo })
  update(@Param('id') id: string, @Body() updateTransactionDto: UpdateTransactionDto): Promise<TransactionRdo>{
    return this.transactionsService.update(id, updateTransactionDto);
  }

  @Delete(':id')
  @ApiEndpoint({ httpCode: HttpStatus.NO_CONTENT })
  remove(@Param('id') id: string) :Promise<void> {
    return this.transactionsService.remove(id);
  }
}
