import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from './entities/role.entity';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { RoleRdo } from './rdo/role.rdo';
import { QueryRoleDto } from './dto/query-role.dto';
import { OffsetPaginationRdo } from 'src/common/rdo/offset-pagination.rdo';
import { OffsetPaginatedRdo } from 'src/common/rdo/offset-paginated.rdo';
import { ValidationException } from 'src/exceptions/validation.exception';
import { ErrorCode } from 'src/common/constants/error-code.constant';
import { RoleName } from 'src/common/constants/app.constant';

@Injectable()
export class RolesService {

  constructor(@InjectRepository(RoleEntity) private rolesRepository: Repository<RoleEntity>) {}

  async create(createRoleDto: CreateRoleDto): Promise<RoleRdo> {
    const {name, status, description, title, permissions} = createRoleDto;
    const role = await this.rolesRepository.create({
      name, 
      status, 
      description, 
      title,
      permissions: permissions.map((item) => ({id: item}))
    });
    await role.save()
    return plainToInstance(RoleRdo, role)
  }

  async findAll(query: QueryRoleDto): Promise<OffsetPaginatedRdo<RoleRdo>> {
    const queryBuilder = this.rolesRepository
    .createQueryBuilder(query.getAlias())
    query.handleQueryBuilder(queryBuilder)
    const [list, totalRecords] = await queryBuilder.getManyAndCount()
    
    const pagination = new OffsetPaginationRdo(totalRecords, query);

    return new OffsetPaginatedRdo(plainToInstance(RoleRdo, list), pagination);
  }

  async findOne(id: string): Promise<RoleRdo> {
    const role = await this.rolesRepository.findOne({
      where: {id},
      relations: {
        permissions: true
      }
    });
    if(!role) {
      throw new NotFoundException(ErrorCode.ROLE_NOT_FOUND)
    }
    return plainToInstance(RoleRdo, role)
  }

  async update(id: string, updateRoleDto: UpdateRoleDto) : Promise<RoleRdo> {
    const role = await this.rolesRepository.findOne({
      where: {id},
      relations: {
        permissions: true
      }
    });
    if(!role) {
      throw new NotFoundException(ErrorCode.ROLE_NOT_FOUND)
    }
    Object.assign(role, {
      ...updateRoleDto,
      permissions: updateRoleDto.permissions ? updateRoleDto.permissions.map((item) => ({id: item})) : role.permissions
    });
    await role.save();
    return await this.findOne(id)
  }

  async remove(id: string) :Promise<void> {
    const role = await this.rolesRepository.findOneBy({id});
    if(!role) {
      throw new NotFoundException(ErrorCode.ROLE_NOT_FOUND)
    }
    await this.rolesRepository.softDelete({id});
  }

  async getRoleByName(roleName: RoleName): Promise<RoleEntity> {
    const role = await this.rolesRepository.findOneBy({name: roleName})
    if(!role) {
      throw new NotFoundException(ErrorCode.ROLE_NOT_FOUND)
    }
    return role
  }
}
