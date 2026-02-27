import { TaskRdo } from "src/api/tasks/rdo/task.rdo";
import { DailyPlanRdo } from "./daily-plan.rdo";
import { Expose, Type } from "class-transformer";
import { OmitType } from "@nestjs/swagger";



export class DailyPlanDetailRdo extends OmitType(DailyPlanRdo, ['tasks']) {

}