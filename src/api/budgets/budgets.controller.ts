import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { BudgetsService } from './budgets.service';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { UpdateBudgetDto } from './dto/update-budget.dto';
import { QueryBudgetDto } from './dto/query-budget.dto';
import { BudgetRdo } from './rdo/budget.rdo';
import { ApiEndpoint } from 'src/decorators/http.decorator';

@Controller('budgets')
export class BudgetsController {
  constructor(private readonly budgetsService: BudgetsService) {}

  @Post()
  @ApiEndpoint({ responseType: BudgetRdo })
  create(@Body() createBudgetDto: CreateBudgetDto) {
    return this.budgetsService.create(createBudgetDto);
  }

  @Get()
  @ApiEndpoint()
  findAll(@Query() queryBudgetDto: QueryBudgetDto) {
    return this.budgetsService.findAll(queryBudgetDto);
  }

  @Get(':id')
  @ApiEndpoint({ responseType: BudgetRdo })
  findOne(@Param('id') id: string) {
    return this.budgetsService.findOne(id);
  }

  @Patch(':id')
  @ApiEndpoint({ responseType: BudgetRdo })
  update(@Param('id') id: string, @Body() updateBudgetDto: UpdateBudgetDto) :Promise<BudgetRdo> {
    return this.budgetsService.update(id, updateBudgetDto);
  }

  @Delete(':id')
  @ApiEndpoint({ httpCode: HttpStatus.NO_CONTENT })
  remove(@Param('id') id: string) {
    return this.budgetsService.remove(id);
  }
}
