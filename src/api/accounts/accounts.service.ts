import { Injectable, NotFoundException, Query } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountEntity } from './entities/account.entity';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { AccountRdo } from './rdo/account.rdo';
import { QueryAccountDto } from './dto/query-account.dto';
import { OffsetPaginationRdo } from 'src/common/rdo/offset-pagination.rdo';
import { OffsetPaginatedRdo } from 'src/common/rdo/offset-paginated.rdo';
import { requestContext } from 'src/common/context/request.context';
import { ErrorCode } from 'src/common/constants/error-code.constant';

@Injectable()
export class AccountsService {

  constructor(@InjectRepository(AccountEntity) private accountsRepository: Repository<AccountEntity>) {

  }

  async create(createAccountDto: CreateAccountDto): Promise<AccountRdo> {
    const account = await this.accountsRepository.create(createAccountDto).save();
    return plainToInstance(AccountRdo, account)
  }

  async findAll(queryDto: QueryAccountDto = new QueryAccountDto()) {

    const context = requestContext.getStore()
    const queryBuilder = this.accountsRepository
      .createQueryBuilder(queryDto.getAlias())
      .andWhere({createdBy: context?.userId})
    queryDto.handleQueryBuilder(queryBuilder);

    const [items, total] = await queryBuilder.getManyAndCount();
    const pagination = new OffsetPaginationRdo(total, queryDto);
    return new OffsetPaginatedRdo(plainToInstance(AccountRdo, items),pagination)
  }

  async findOne(id: string) :Promise<AccountRdo> {
    const context = requestContext.getStore()
    const account = await this.accountsRepository.findOneBy({id, createdBy: context?.userId});
    if(!account) {
      throw new NotFoundException(ErrorCode.ACCOUNT_NOT_FOUND)
    }
    return plainToInstance(AccountRdo, account)
  }

  async update(id: string, updateAccountDto: UpdateAccountDto) {
    const context = requestContext.getStore()
    const account = await this.accountsRepository.findOneBy({id, createdBy: context?.userId});
    if(!account) {
      throw new NotFoundException(ErrorCode.ACCOUNT_NOT_FOUND)
    }
    Object.assign(account, updateAccountDto);
    await account.save();
    return plainToInstance(AccountRdo, account)
  }

  async remove(id: string) :Promise<void> {
    await this.findOne(id);
    await this.accountsRepository.delete(id)
  }
}
