import { Injectable } from '@nestjs/common';
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

@Injectable()
export class AccountsService {

  constructor(@InjectRepository(AccountEntity) private accountsRepository: Repository<AccountEntity>) {

  }

  async create(createAccountDto: CreateAccountDto): Promise<AccountRdo> {
    const account = await this.accountsRepository.create(createAccountDto).save();
    return plainToInstance(AccountRdo, account)
  }

  async findAll(queryDto: QueryAccountDto) {

    const context = requestContext.getStore()
    const queryBuilder = this.accountsRepository
      .createQueryBuilder(queryDto.getAlias())
      .andWhere({createdBy: context?.userId})
    queryDto.handleQueryBuilder(queryBuilder);

    const [items, total] = await queryBuilder.getManyAndCount();
    const pagination = new OffsetPaginationRdo(total, queryDto);
    return new OffsetPaginatedRdo(plainToInstance(AccountRdo, items),pagination)
  }

  findOne(id: number) {
    return `This action returns a #${id} account`;
  }

  update(id: number, updateAccountDto: UpdateAccountDto) {
    return `This action updates a #${id} account`;
  }

  remove(id: number) {
    return `This action removes a #${id} account`;
  }
}
