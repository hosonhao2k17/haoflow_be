import { Exclude } from "class-transformer";
import { ExposeField } from "src/decorators/field.decorator";
import { BaseRdo } from "src/common/rdo/base-response.rdo";

@Exclude()
export class TaskCategoryRdo {

    @ExposeField()
    id: string;

    @ExposeField()
    title: string;

    @ExposeField()
    description?: string;

    @ExposeField()
    color?: string;

    @ExposeField()
    icon?: string;

    @ExposeField()
    totalTask: number;

    @ExposeField()
    doneTask: number;
}