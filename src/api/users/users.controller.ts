import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { QueryUserDto } from './dto/query-user.dto';
import { OffsetPaginatedRdo } from 'src/common/rdo/offset-paginated.rdo';
import { UserRdo } from './rdo/user.rdo';
import { LoadMoreUserDto } from './dto/load-more-user.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { User } from 'src/decorators/user.decorator';
import { Action, Subject } from 'src/decorators/permission.decorator';
import { PermissionAction, PermissionSubject } from 'src/common/constants/app.constant';
import { PermissionGuard } from 'src/guards/permission.guard';
import { Public } from 'src/decorators/public.decorator';
import { UpdateMultiUserDto } from './dto/update-multi-user.dto';

@Controller('users')
@UseGuards(PermissionGuard)
@Subject(PermissionSubject.USER)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Action(PermissionAction.CREATE)
  @ApiBearerAuth()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get('load-more')
  @Action(PermissionAction.READ)
  @ApiBearerAuth()
  loadMore(@Query() loadMoreUserDto: LoadMoreUserDto) {
    return this.usersService.loadMore(loadMoreUserDto)
  }

  @Get('me')
  @ApiBearerAuth()
  getCurrentUser(@User('id') id: string) {
    return this.usersService.getCurrentUser(id)
  }

  @Get()
  @ApiBearerAuth()
  @Action(PermissionAction.READ)
  findAll(@Query() queryUserDto: QueryUserDto): Promise<OffsetPaginatedRdo<UserRdo>> {
    return this.usersService.findAll(queryUserDto);
  }

  @Get(':id')
  @ApiBearerAuth()
  @Action(PermissionAction.READ)
  findOne(@Param('id') id: string) :Promise<UserRdo> {
    return this.usersService.findOne(id);
  }

  @Patch('multi')
  @ApiBearerAuth()
  updateMulti(@Body() dto: UpdateMultiUserDto): Promise<void> {
    return this.usersService.updateMulti(dto)
  }

  @Patch(':id')
  @ApiBearerAuth()
  @Action(PermissionAction.UPDATE)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @Action(PermissionAction.DELETE)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) :Promise<void> {
    return this.usersService.remove(id);
  }
}
