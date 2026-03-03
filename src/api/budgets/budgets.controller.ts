import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { BudgetsService } from './budgets.service';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { UpdateBudgetDto } from './dto/update-budget.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { QueryBudgetDto } from './dto/query-budget.dto';
import { BudgetRdo } from './rdo/budget.rdo';

@Controller('budgets')
export class BudgetsController {
  constructor(private readonly budgetsService: BudgetsService) {}

  @Post()
  @ApiBearerAuth()
  create(@Body() createBudgetDto: CreateBudgetDto) {
    return this.budgetsService.create(createBudgetDto);
  }

  @Get()
  @ApiBearerAuth()
  findAll(@Query() queryBudgetDto: QueryBudgetDto) {
    return this.budgetsService.findAll(queryBudgetDto);
  }

  @Get(':id')
  @ApiBearerAuth()
  findOne(@Param('id') id: string) {
    return this.budgetsService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() updateBudgetDto: UpdateBudgetDto) :Promise<BudgetRdo> {
    return this.budgetsService.update(id, updateBudgetDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.budgetsService.remove(id);
  }
}
