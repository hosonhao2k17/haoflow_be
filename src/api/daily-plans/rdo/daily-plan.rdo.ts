import { Exclude, Type } from "class-transformer";
import { ExposeField } from "src/decorators/field.decorator";
import { BaseRdo } from "src/common/rdo/base-response.rdo";
import { SummaryTaskRdo } from "src/api/tasks/rdo/summary-task.rdo";

@Exclude()
export class DailyPlanRdo extends BaseRdo {

    @ExposeField()
    id: string;

    @ExposeField()
    title: string;

    @ExposeField()
    description: string;

    @ExposeField()
    date: Date;

    @ExposeField()
    summary: SummaryTaskRdo;

    @ExposeField()
    startTime: string;

    @ExposeField()
    endTime: string;
}