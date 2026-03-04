import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TransactionEntity } from './entities/transaction.entity';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { TransactionRdo } from './rdo/transaction.rdo';
import { QueryTransactionDto } from './dto/query-transaction.dto';
import { CursorPaginationRdo } from 'src/common/rdo/cursor-pagination.rdo';
import { getAfterCursor, getBeforeCursor } from 'src/utils/cursor-pagination';
import { CursorPaginatedRdo } from 'src/common/rdo/cursor-paginated.rdo';
import { ErrorCode } from 'src/common/constants/error-code.constant';
import { TransactionCategoriesService } from '../transaction-categories/transaction-categories.service';
import { AccountsService } from '../accounts/accounts.service';
import { requestContext } from 'src/common/context/request.context';
import { CreateFromReceiptDto } from './dto/create-from-receipt.dto';
import { AiService } from '../ai/ai.service';
import { classToTypeString } from 'src/utils/handle-object';
import { ReceiptEntity } from './entities/receipt.entity';
import { ReceiptStatus, TransactionSource, TransactionType } from 'src/common/constants/app.constant';
import { ReviewTransactionReceiptDto } from './dto/review-transaction-receipt.dto';
import { ReviewTransactionReceiptRdo } from './rdo/review-transaction-receipt.rdo';


@Injectable()
export class TransactionsService {

  constructor(
    @InjectRepository(TransactionEntity) private transactionsRepository: Repository<TransactionEntity>,
    @InjectRepository(ReceiptEntity) private receiptsRepository: Repository<ReceiptEntity>,
    private transactionCategoriesService: TransactionCategoriesService,
    private accountsService: AccountsService,
    private aiService: AiService
  ) {}

  async create(createTransactionDto: CreateTransactionDto) :Promise<TransactionRdo> {
    const {categoryId, accountId, ...rest} = createTransactionDto
    const [category, account] = await Promise.all([
      this.transactionCategoriesService.findOne(categoryId),
      this.accountsService.findOne(accountId)
    ])
    const transaction = await this.transactionsRepository.create({
      ...rest,
      category,
      account
    }).save()
    return plainToInstance(TransactionRdo, transaction)
  }

  async reviewTransactionReceipt(dto: ReviewTransactionReceiptDto) {
    const {imageUrl} = dto;
    const [accounts, categories] = await Promise.all([
      this.accountsService.findAll(),
      this.transactionCategoriesService.findAll()
    ])
    const dataImage = await this.aiService.handleImage(imageUrl);
    const data = await this.aiService.generateAiContent({
      module: "receipts",
      message: `Phân tích hóa đơn và trả về dữ liệu theo dạng bên dưới`,
      typeString: classToTypeString({
        categoryId: "",
        accountId: "",
        type: TransactionType,
        amount: 0,
        description: "",
        merchant: "",
        transactionDate: new Date(),
        isRecurring: false,
        
      }) + '-receipt:[' + classToTypeString({
          imageUrl: "",
          ocrRawText: "",
          parsedAmount: 0,
          parsedMerchant: "",
          parsedDate: new Date(),
          status: ReceiptStatus
        }) + ']',
      data: {
        dataImage,
        accounts,
        categories
      }
    })  
    const json = this.aiService.extractJson<ReviewTransactionReceiptRdo>(data);
    return plainToInstance(ReviewTransactionReceiptRdo, json);
  }

  async createFromReceipt(dto: CreateFromReceiptDto) {
    const {receipt,...data} = dto;
    const newReceipt = await this.receiptsRepository.create(receipt).save()
    const transaction = await this.transactionsRepository.create({
      ...data,
      source: TransactionSource.OCR,
      receipt: newReceipt
    }).save();
    return plainToInstance(TransactionRdo, transaction)
  }

  async findAll(queryTransactionDto: QueryTransactionDto) :Promise<CursorPaginatedRdo<TransactionRdo>> {
    const queryBuilder = this.transactionsRepository
      .createQueryBuilder(queryTransactionDto.getAlias())
      .leftJoinAndSelect(`${queryTransactionDto.getAlias()}.category`,"category")
      .leftJoinAndSelect(`${queryTransactionDto.getAlias()}.account`,"account")
      .andWhere(`${queryTransactionDto.getAlias()}.createdBy = :createdBy`,{createdBy: requestContext.getStore()?.userId})

    queryTransactionDto.handleQueryBuilder(queryBuilder);
    const [items, total] =  await queryBuilder.getManyAndCount();

    const cursorPagination = new CursorPaginationRdo(
      queryTransactionDto.limit, 
      getAfterCursor(items),
      getBeforeCursor(items),
      total
    );

    return new CursorPaginatedRdo(plainToInstance(TransactionRdo, items), cursorPagination);
  }

  async findOne(id: string) {
    const transaction = await this.transactionsRepository.findOne({
      where: {
        id,
        createdBy: requestContext.getStore()?.userId
      },
      relations: {
        category: true,
        account: true
      }
    });
    if(!transaction) {
      throw new NotFoundException(ErrorCode.TRANSACTION_NOT_FOUND)
    }
    return plainToInstance(TransactionRdo, transaction)
  }

  async update(id: string, updateTransactionDto: UpdateTransactionDto) {
    const {categoryId, accountId, ...data} = updateTransactionDto;
    const transaction = await this.transactionsRepository.findOne({
      where: {
        id,
        createdBy: requestContext.getStore()?.userId
      },
      relations: {
        category: true,
        account: true
      }
    });
    if(!transaction) {
      throw new NotFoundException(ErrorCode.TRANSACTION_NOT_FOUND)
    }
    const [category, account] = await Promise.all([
      categoryId ? this.transactionCategoriesService.findOne(categoryId) : transaction.category,
      accountId ? this.accountsService.findOne(accountId) : transaction.account
    ])
    Object.assign(transaction, {
      ...data,
      category,
      account
    })
    await transaction.save()
    return plainToInstance(TransactionRdo, transaction)
  }

  async remove(id: string) :Promise<void> {
    await this.findOne(id);
    await this.transactionsRepository.delete(id)
  }
}
