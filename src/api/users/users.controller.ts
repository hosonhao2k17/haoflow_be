import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { QueryUserDto } from './dto/query-user.dto';
import { OffsetPaginatedRdo } from 'src/common/rdo/offset-paginated.rdo';
import { UserRdo } from './rdo/user.rdo';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(@Query() queryUserDto: QueryUserDto): Promise<OffsetPaginatedRdo<UserRdo>> {
    return this.usersService.findAll(queryUserDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) :Promise<UserRdo> {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) :Promise<void> {
    return this.usersService.remove(id);
  }
}
