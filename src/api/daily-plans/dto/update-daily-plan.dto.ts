
import { PartialType } from '@nestjs/swagger';
import { CreateDailyPlanDto } from './create-daily-plan.dto';

export class UpdateDailyPlanDto extends PartialType(CreateDailyPlanDto) {}
