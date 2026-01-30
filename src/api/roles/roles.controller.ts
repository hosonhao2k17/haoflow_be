import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { QueryRoleDto } from './dto/query-role.dto';
import { OffsetPaginatedRdo } from 'src/common/rdo/offset-paginated.rdo';
import { RoleRdo } from './rdo/role.rdo';
import { ResponseMessage } from 'src/decorators/message.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @ApiBearerAuth()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @Get()
  @ApiBearerAuth()
  findAll(@Query() queryRoleDto: QueryRoleDto): Promise<OffsetPaginatedRdo<RoleRdo>> {
    return this.rolesService.findAll(queryRoleDto);
  }

  @Get(':id')
  @ApiBearerAuth()
  findOne(@Param('id') id: string) :Promise<RoleRdo> {
    return this.rolesService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) : Promise<RoleRdo> {
    return this.rolesService.update(id, updateRoleDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string): Promise<void> {
    return this.rolesService.remove(id);
  }
}
