import { Exclude, Expose } from "class-transformer";
import { BaseRdo } from "src/common/rdo/base-response.rdo";

@Exclude()
export class TaskCategoryRdo {

    @Expose()
    id: string;

    @Expose()
    title: string;

    @Expose()
    description?: string;

    @Expose()
    color?: string;

    @Expose()
    icon?: string;

    @Expose()
    totalTask: number;

    @Expose()
    doneTask: number;
}