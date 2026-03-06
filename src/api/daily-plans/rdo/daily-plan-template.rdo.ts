import { OmitType } from "@nestjs/swagger";
import { DailyPlanRdo } from "./daily-plan.rdo";
import { Expose, Type } from "class-transformer";
import { TaskRdo } from "src/api/tasks/rdo/task.rdo";


export class DailyPlanTemplateRdo extends OmitType(DailyPlanRdo,['date','summary']) {

    @Expose()
    @Type(() => TaskRdo)
    tasks: TaskRdo;
}