import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountEntity } from './entities/account.entity';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { AccountRdo } from './rdo/account.rdo';

@Injectable()
export class AccountsService {

  constructor(@InjectRepository(AccountEntity) private accountsRepository: Repository<AccountEntity>) {

  }

  async create(createAccountDto: CreateAccountDto): Promise<AccountRdo> {
    const account = await this.accountsRepository.create(createAccountDto).save();
    return plainToInstance(AccountRdo, account)
  }

  findAll() {
    return `This action returns all accounts`;
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
