import { Exclude, Expose, Type } from "class-transformer";
import { BaseRdo } from "src/common/rdo/base-response.rdo";
import { TimeBlockRdo } from "./time-block.rdo";
import { TaskRdo } from "src/api/tasks/rdo/task.rdo";
import { SummaryTaskRdo } from "src/api/tasks/rdo/summary-task.rdo";

@Exclude()
export class DailyPlanRdo extends BaseRdo {
    
    @Expose()
    id: string;

    @Expose()
    title: string;

    @Expose()
    description: string;

    @Expose()
    date: Date;

    @Expose()
    summary: SummaryTaskRdo;

    @Expose()
    @Type(() => TaskRdo)
    tasks: TaskRdo[];

    @Expose()
    @Type(() => TimeBlockRdo)
    timeBlock: TimeBlockRdo;
}