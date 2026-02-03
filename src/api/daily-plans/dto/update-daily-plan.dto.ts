import { PartialType } from '@nestjs/mapped-types';
import { CreateDailyPlanDto } from './create-daily-plan.dto';

export class UpdateDailyPlanDto extends PartialType(CreateDailyPlanDto) {}
