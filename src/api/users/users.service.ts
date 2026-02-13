import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ValidationException } from 'src/exceptions/validation.exception';
import { In, Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRdo } from './rdo/user.rdo';
import { plainToInstance } from 'class-transformer';
import { QueryUserDto } from './dto/query-user.dto';
import { OffsetPaginationRdo } from 'src/common/rdo/offset-pagination.rdo';
import { OffsetPaginatedRdo } from 'src/common/rdo/offset-paginated.rdo';
import { ErrorCode } from 'src/common/constants/error-code.constant';
import { LoadMoreUserDto } from './dto/load-more-user.dto';
import { CursorPaginationRdo } from 'src/common/rdo/cursor-pagination.rdo';
import { getAfterCursor, getBeforeCursor } from 'src/utils/cursor-pagination';
import { CursorPaginatedRdo } from 'src/common/rdo/cursor-paginated.rdo';
import { RolesService } from '../roles/roles.service';
import { AsyncLocalStorage } from 'node:async_hooks';
import { SessionEntity } from './entities/session.entity';
import { ConfigService } from '@nestjs/config';
import ms, { StringValue } from 'ms';
import { UpdateMultiUserDto } from './dto/update-multi-user.dto';
import { UserDetailRdo } from './rdo/user-detail.rdo';
@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(UserEntity) private usersRepository: Repository<UserEntity>,
    private rolesService: RolesService,
    @InjectRepository(SessionEntity) private sessionRepository: Repository<SessionEntity>,
    private configSerive: ConfigService
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

  createSession(userId: string): Promise<SessionEntity> {

    const expiresIn = this.configSerive.getOrThrow<StringValue>('JWT_ACCESS_EXPIRES');
    const expiresAt = new Date(Date.now() + ms(expiresIn))

    return this.sessionRepository.create({
      user: {id: userId}, 
      expiresAt
    }).save()
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
    const queryBuilder = this.usersRepository
      .createQueryBuilder(queryUserDto.getAlias())
      .leftJoinAndSelect('user.role','role')
      .loadRelationCountAndMap(
        'role.totalPermission',
        'role.permissions'
      )
    queryUserDto.handleQueryBuilder(queryBuilder)
     

    const [list, totalRecords] = await queryBuilder.getManyAndCount()
    const pagination = new OffsetPaginationRdo(totalRecords, queryUserDto);

    return new OffsetPaginatedRdo(plainToInstance(UserRdo, list), pagination);
  }

  async findOne(id: string) :Promise<UserDetailRdo> {
    const user = await this.usersRepository.findOne({
      where: {
        id
      },
      relations: {
        role: {
          permissions: true
        }
      }
    });
    if(!user) {
      throw new NotFoundException(ErrorCode.USER_NOT_FOUND);
    }
    return plainToInstance(UserDetailRdo, user)
  }

  async updateMulti(dto: UpdateMultiUserDto): Promise<void> {
    const {ids, ...update} = dto;
    const users = await this.usersRepository.findBy({id: In(ids)});
    if(users.length !== ids.length) {
      throw new ValidationException(ErrorCode.SOME_USER_NOT_FOUND)
    }
    for(const item of users) {
      
      Object.assign(item, update)
    } 
    await this.usersRepository.save(users)
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
    return this.usersRepository.findOneBy({email})
  }

  async getCurrentUser(id: string) :Promise<UserDetailRdo> {
    const user = await this.usersRepository.findOne({
      where: {id},
      relations: {
        role: {
          permissions: true
        }
      }
    })
    return plainToInstance(UserDetailRdo, user)
  }
}
