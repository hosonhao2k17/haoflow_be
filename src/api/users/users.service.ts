import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ValidationException } from 'src/exceptions/validation.exception';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRdo } from './rdo/user.rdo';
import { plainToInstance } from 'class-transformer';
import { QueryUserDto } from './dto/query-user.dto';
import { OffsetPaginationRdo } from 'src/common/rdo/offset-pagination.rdo';
import { OffsetPaginatedRdo } from 'src/common/rdo/offset-paginated.rdo';
import { ErrorCode } from 'src/common/constants/error-code.constant';
import { LoadMoreUserDto } from './dto/load-more-user.dto';
import e from 'express';
import { CursorPaginationRdo } from 'src/common/rdo/cursor-pagination.rdo';
import { getAfterCursor, getBeforeCursor } from 'src/utils/cursor-pagination';
import { CursorPaginatedRdo } from 'src/common/rdo/cursor-paginated.rdo';
import { CurrentUserRdo } from './rdo/current-user.rdo';
import { RolesService } from '../roles/roles.service';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(UserEntity) private usersRepository: Repository<UserEntity>,
    private rolesService: RolesService
  ) {

  }

  async create(createUserDto: CreateUserDto) :Promise<UserRdo> {
    const role = await this.rolesService.getRoleByName(createUserDto.roleName);
    const user = await this.usersRepository.create({
      ...createUserDto,
      role
    }).save();

    return plainToInstance(UserRdo, user)
  }

  async loadMore(loadMoreUser: LoadMoreUserDto) {
    const queryBuilder = this.usersRepository.createQueryBuilder(loadMoreUser.getAlias())
    loadMoreUser.handleQueryBuilder(queryBuilder);
    const [users, total] = await queryBuilder.getManyAndCount();

    const pagination = new CursorPaginationRdo(
      loadMoreUser.limit,
      getBeforeCursor(users),
      getAfterCursor(users),
      total
    )
    
    return new CursorPaginatedRdo(plainToInstance(UserRdo, users), pagination)
  }

  async findAll(queryUserDto: QueryUserDto): Promise<OffsetPaginatedRdo<UserRdo>> {
    const queryBuilder = this.usersRepository.createQueryBuilder('user');
     queryUserDto.handleQueryBuilder(queryBuilder);

     const [list, totalRecords] = await queryBuilder.getManyAndCount()
         
    const pagination = new OffsetPaginationRdo(totalRecords, queryUserDto);

    return new OffsetPaginatedRdo(plainToInstance(UserRdo, list), pagination);
  }

  async findOne(id: string) :Promise<UserRdo> {
    const user = await this.usersRepository.findOneBy({id});
    if(!user) {
      throw new NotFoundException(ErrorCode.USER_NOT_FOUND);
    }
    return plainToInstance(UserRdo, user)
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOneBy({id});
    if(!user) {
      throw new NotFoundException(ErrorCode.USER_NOT_FOUND);
    }

    Object.assign(user, updateUserDto)
    await user.save()
    return plainToInstance(UserRdo, user);
  }

  async remove(id: string) :Promise<void> {
    await this.usersRepository.findOneBy({id});
    await this.usersRepository.softDelete(id)
  }

  getUserByEmail(email: string) :Promise<UserEntity | null> {
    return this.usersRepository.findOne(
      {
        where: {
          email
        },
        relations: {
          role: true
        }
      }
    )
  }

  async getCurrentUser(id: string) {
    const user = await this.usersRepository.findOne({
      where: {id},
      relations: {
        role: {
          permissions: true
        }
      }
    })
    return plainToInstance(CurrentUserRdo, user)
  }
}
