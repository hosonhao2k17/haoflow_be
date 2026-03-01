import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { AccountRdo } from './rdo/account.rdo';
import { ApiBearerAuth } from '@nestjs/swagger';
import { QueryAccountDto } from './dto/query-account.dto';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @ApiBearerAuth()
  @Post()
  create(@Body() createAccountDto: CreateAccountDto) :Promise<AccountRdo> {
    return this.accountsService.create(createAccountDto);
  }

  @Get()
  @ApiBearerAuth()
  findAll(@Query() queryAccountDto: QueryAccountDto) {
    return this.accountsService.findAll(queryAccountDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accountsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAccountDto: UpdateAccountDto) {
    return this.accountsService.update(+id, updateAccountDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accountsService.remove(+id);
  }
}
