import { OmitType } from "@nestjs/swagger";
import { DailyPlanRdo } from "./daily-plan.rdo";
import { Exclude, Expose, Type } from "class-transformer";
import { TaskRdo } from "src/api/tasks/rdo/task.rdo";

@Exclude()
export class DailyPlanTemplateRdo extends OmitType(DailyPlanRdo,['date','summary']) {

    @Expose()
    @Type(() => TaskRdo)
    tasks: TaskRdo;
}