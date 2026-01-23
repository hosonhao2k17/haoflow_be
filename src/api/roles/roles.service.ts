import { Injectable } from '@nestjs/common';
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

@Injectable()
export class RolesService {

  constructor(@InjectRepository(RoleEntity) private rolesRepository: Repository<RoleEntity>) {}

  async create(createRoleDto: CreateRoleDto): Promise<RoleRdo> {
    const role = await this.rolesRepository.create(createRoleDto);
    await role.save()
    return plainToInstance(RoleRdo, role)
  }

  async findAll(query: QueryRoleDto): Promise<OffsetPaginatedRdo<RoleRdo>> {
    const queryBuilder = this.rolesRepository
    .createQueryBuilder('role')
    .offset(query.getOffset())
    .limit(query.limit)
    .orderBy(`role.${query?.sortBy}`,query.sortOrder)

    if(query.keyword){
      queryBuilder.andWhere("role.name = :keyword OR role.title = :keyword",{keyword: query.keyword})
    }

    if(query.status) {
      queryBuilder.andWhere("role.status = :status",{status: query.status})
    }
    const [list, totalRecords] = await queryBuilder.getManyAndCount()
    
    const pagination = new OffsetPaginationRdo(totalRecords, query);

    return new OffsetPaginatedRdo(plainToInstance(RoleRdo, list), pagination);
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
