import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { DailyPlansService } from './daily-plans.service';
import { CreateDailyPlanDto } from './dto/create-daily-plan.dto';
import { UpdateDailyPlanDto } from './dto/update-daily-plan.dto';
import { ApiEndpoint } from 'src/decorators/http.decorator';
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
  @ApiEndpoint({ responseType: DailyPlanRdo })
  create(@Body() createDailyPlanDto: CreateDailyPlanDto) {
    return this.dailyPlansService.create(createDailyPlanDto);
  }

  @Get('stats')
  @ApiEndpoint()
  stats() {
    
  }

  @Post('template')
  @ApiEndpoint({ responseType: DailyPlanTemplateRdo })
  createTemplate(@Body() dto: CreateDailyPlanTemplateDto) :Promise<DailyPlanTemplateRdo> {
    return this.dailyPlansService.createTemplate(dto)
  }

  @Get('template')
  @ApiEndpoint()
  findTemplates(@Query() dto: QueryDailyPlanTemplateDto) :Promise<OffsetPaginatedRdo<DailyPlanTemplateRdo>> {
    return this.dailyPlansService.findTemplates(dto)
  }

  @Get()
  @ApiEndpoint()
  findAll(@Query() queryDailyPlanDto: QueryDailyPlanDto) {
    return this.dailyPlansService.findAll(queryDailyPlanDto);
  }

  @Get(':id/template')
  @ApiEndpoint()
  findTemplate(@Param('id') id: string) {
    return this.dailyPlansService.findTemplate(id)
  }

  @Get(':id')
  @ApiEndpoint({ responseType: DailyPlanRdo })
  findOne(@Param('id') id: string) {
    return this.dailyPlansService.findOne(id);
  }

  @Patch(':id')
  @ApiEndpoint({ responseType: DailyPlanRdo })
  update(@Param('id') id: string, @Body() updateDailyPlanDto: UpdateDailyPlanDto) {
    return this.dailyPlansService.update(id, updateDailyPlanDto);
  }

  @Delete(':id')
  @ApiEndpoint()
  remove(@Param('id') id: string) {
    return this.dailyPlansService.remove(id);
  }
}
