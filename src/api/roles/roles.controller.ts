import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { QueryRoleDto } from './dto/query-role.dto';
import { OffsetPaginatedRdo } from 'src/common/rdo/offset-paginated.rdo';
import { RoleRdo } from './rdo/role.rdo';
import { ResponseMessage } from 'src/decorators/message.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';
import { PermissionGuard } from 'src/guards/permission.guard';
import { PermissionAction, PermissionSubject } from 'src/common/constants/app.constant';
import { Action, Subject } from 'src/decorators/permission.decorator';

@Controller('roles')
@Subject(PermissionSubject.ROLE)
@UseGuards(PermissionGuard)
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @Action(PermissionAction.CREATE)
  @ApiBearerAuth()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @Get()
  @Action(PermissionAction.READ)
  @ApiBearerAuth()
  findAll(@Query() queryRoleDto: QueryRoleDto): Promise<OffsetPaginatedRdo<RoleRdo>> {
    return this.rolesService.findAll(queryRoleDto);
  }

  @Get(':id')
  @Action(PermissionAction.READ)
  @ApiBearerAuth()
  findOne(@Param('id') id: string) :Promise<RoleRdo> {
    return this.rolesService.findOne(id);
  }

  @Patch(':id')
  @Action(PermissionAction.UPDATE)
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) : Promise<RoleRdo> {
    return this.rolesService.update(id, updateRoleDto);
  }

  @Action(PermissionAction.DELETE)
  @Delete(':id')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string): Promise<void> {
    return this.rolesService.remove(id);
  }
}
