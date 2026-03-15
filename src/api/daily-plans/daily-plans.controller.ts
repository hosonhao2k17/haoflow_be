import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { DailyPlansService } from './daily-plans.service';
import { CreateDailyPlanDto } from './dto/create-daily-plan.dto';
import { UpdateDailyPlanDto } from './dto/update-daily-plan.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { QueryDailyPlanDto } from './dto/query-daily-plan.dto';
import { QueryDailyPlanTemplateDto } from './dto/query-daily-plan-template.dto';
import { DailyPlanTemplateRdo } from './rdo/daily-plan-template.rdo';
import { OffsetPaginatedRdo } from 'src/common/rdo/offset-paginated.rdo';
import { CreateDailyPlanTemplateDto } from './dto/create-daily-plan-template.dto';
import { DailyPlanRdo } from './rdo/daily-plan.rdo';

@Controller('daily-plans')
export class DailyPlansController {
  constructor(private readonly dailyPlansService: DailyPlansService) {}

  @Post()
  @ApiBearerAuth()
  create(@Body() createDailyPlanDto: CreateDailyPlanDto) {
    return this.dailyPlansService.create(createDailyPlanDto);
  }

  @Get('stats')
  stats() {
    
  }

  @Post('template')
  @ApiBearerAuth()
  createTemplate(@Body() dto: CreateDailyPlanTemplateDto) :Promise<DailyPlanTemplateRdo> {
    return this.dailyPlansService.createTemplate(dto)
  }

  @Get('template')
  @ApiBearerAuth()
  findTemplates(@Query() dto: QueryDailyPlanTemplateDto) :Promise<OffsetPaginatedRdo<DailyPlanTemplateRdo>> {
    return this.dailyPlansService.findTemplates(dto)
  }

  @Get()
  @ApiBearerAuth()
  findAll(@Query() queryDailyPlanDto: QueryDailyPlanDto) {
    return this.dailyPlansService.findAll(queryDailyPlanDto);
  }

  @Get(':id/template')
  @ApiBearerAuth()
  findTemplate(@Param('id') id: string) {
    return this.dailyPlansService.findTemplate(id)
  }

  @Get(':id')
  @ApiBearerAuth()
  findOne(@Param('id') id: string) {
    return this.dailyPlansService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() updateDailyPlanDto: UpdateDailyPlanDto) {
    return this.dailyPlansService.update(id, updateDailyPlanDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.dailyPlansService.remove(id);
  }
}
