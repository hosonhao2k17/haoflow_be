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

@Injectable()
export class UsersService {

  constructor(@InjectRepository(UserEntity) private usersRepository: Repository<UserEntity>) {

  }

  async create(createUserDto: CreateUserDto) :Promise<UserRdo> {
    const user = await this.usersRepository.create({
      ...createUserDto,
      role: {
        id: createUserDto.roleId
      }
    }).save();

    return plainToInstance(UserRdo, user)
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

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
