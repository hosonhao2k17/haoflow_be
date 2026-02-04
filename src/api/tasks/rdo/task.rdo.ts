import { Expose, Type } from "class-transformer";
import { TaskCategoryRdo } from "src/api/task-categories/rdo/task-catgory.rdo";
import { BaseRdo } from "src/common/rdo/base-response.rdo";


export class TaskRdo extends BaseRdo{

    @Expose()
    id: string;

    @Expose()
    todo: string;

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
}