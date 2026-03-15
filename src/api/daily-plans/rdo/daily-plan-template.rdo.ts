import { OmitType } from "@nestjs/swagger";
import { DailyPlanRdo } from "./daily-plan.rdo";
import { Exclude, Type } from "class-transformer";
import { ExposeField } from "src/decorators/field.decorator";
import { TaskRdo } from "src/api/tasks/rdo/task.rdo";

@Exclude()
export class DailyPlanTemplateRdo extends OmitType(DailyPlanRdo,['date','summary']) {

    @ExposeField()
    @Type(() => TaskRdo)
    tasks: TaskRdo;
}