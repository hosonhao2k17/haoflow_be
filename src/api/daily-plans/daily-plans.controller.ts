import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DailyPlansService } from './daily-plans.service';
import { CreateDailyPlanDto } from './dto/create-daily-plan.dto';
import { UpdateDailyPlanDto } from './dto/update-daily-plan.dto';

@Controller('daily-plans')
export class DailyPlansController {
  constructor(private readonly dailyPlansService: DailyPlansService) {}

  @Post()
  create(@Body() createDailyPlanDto: CreateDailyPlanDto) {
    return this.dailyPlansService.create(createDailyPlanDto);
  }

  @Get()
  findAll() {
    return this.dailyPlansService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dailyPlansService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDailyPlanDto: UpdateDailyPlanDto) {
    return this.dailyPlansService.update(+id, updateDailyPlanDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dailyPlansService.remove(+id);
  }
}
