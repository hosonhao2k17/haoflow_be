import { Exclude, Expose, Type } from "class-transformer";
import { TaskCategoryRdo } from "src/api/task-categories/rdo/task-catgory.rdo";
import { Priority } from "src/common/constants/priority.constant";
import { BaseRdo } from "src/common/rdo/base-response.rdo";

@Exclude()
export class TaskRdo {

    @Expose()
    id: string;

    @Expose()
    todo: string;

    @Expose()
    description?: string;
    
    @Expose()
    priority: Priority;

    @Expose()
    startTime: Date;


    @Expose()
    endTime: Date;

    @Expose()
    orderIndex: number;

    @Expose()
    status: Date;

    @Expose()
    @Type(() => TaskCategoryRdo)
    category: TaskCategoryRdo;

    @Expose()
    dailyPlanId: string;
}