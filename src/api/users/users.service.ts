import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ValidationException } from 'src/exceptions/validation.exception';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRdo } from './rdo/user.rdo';
import { plainToInstance } from 'class-transformer';

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

  findAll() {
    throw new ValidationException()
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
