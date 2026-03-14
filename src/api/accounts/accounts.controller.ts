import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { AccountRdo } from './rdo/account.rdo';
import { ApiBearerAuth } from '@nestjs/swagger';
import { QueryAccountDto } from './dto/query-account.dto';
import { ApiEndpoint } from 'src/decorators/http.decorator';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @ApiEndpoint({
    responseType: AccountRdo
  })
  @Post()
  create(@Body() createAccountDto: CreateAccountDto) :Promise<AccountRdo> {
    return this.accountsService.create(createAccountDto);
  }

  @ApiEndpoint({
    responseType: AccountRdo,
    isPaginated: true,
    paginationType: 'offset'
  })
  @Get()
  findAll(@Query() queryAccountDto: QueryAccountDto) {
    return this.accountsService.findAll(queryAccountDto);
  }

  @Get(':id')
  @ApiEndpoint({
    responseType: AccountRdo
  })
  findOne(@Param('id') id: string) :Promise<AccountRdo> {
    return this.accountsService.findOne(id);
  }

  @Patch(':id')
  @ApiEndpoint({
    responseType: AccountRdo
  })
  update(@Param('id') id: string, @Body() updateAccountDto: UpdateAccountDto) :Promise<AccountRdo> {
    return this.accountsService.update(id, updateAccountDto);
  }

  @Delete(':id')  
  @ApiEndpoint({
    responseType: AccountRdo,
    httpCode: HttpStatus.NO_CONTENT
  })
  remove(@Param('id') id: string) :Promise<void> {
    return this.accountsService.remove(id);
  }
}
