import { OmitType } from "@nestjs/swagger";
import { CreateDailyPlanDto } from "./create-daily-plan.dto";



export class CreateDailyPlanTemplateDto extends OmitType(CreateDailyPlanDto,['date']) {

}