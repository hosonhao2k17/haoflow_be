import { Exclude, Type } from "class-transformer";
import { ExposeField } from "src/decorators/field.decorator";
import { TaskCategoryRdo } from "src/api/task-categories/rdo/task-catgory.rdo";
import { Priority } from "src/common/constants/priority.constant";
import { BaseRdo } from "src/common/rdo/base-response.rdo";

@Exclude()
export class TaskRdo {

    @ExposeField()
    id: string;

    @ExposeField()
    todo: string;

    @ExposeField()
    description?: string;

    @ExposeField()
    priority: Priority;

    @ExposeField()
    startTime: Date;

    @ExposeField()
    isAlarm: boolean;

    @ExposeField()
    endTime: Date;

    @ExposeField()
    status: Date;

    @ExposeField()
    @Type(() => TaskCategoryRdo)
    category: TaskCategoryRdo;
}