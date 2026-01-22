import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from './entities/role.entity';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { RoleRdo } from './rdo/role.rdo';

@Injectable()
export class RolesService {

  constructor(@InjectRepository(RoleEntity) private rolesRepository: Repository<RoleEntity>) {}

  async create(createRoleDto: CreateRoleDto): Promise<RoleRdo> {
    const role = await this.rolesRepository.create(createRoleDto);
    await role.save()
    return plainToInstance(RoleRdo, role)
  }

  findAll() {
    return `This action returns all roles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} role`;
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
