import { Exclude, Expose } from "class-transformer";
import { BaseRdo } from "src/common/rdo/base-response.rdo";

@Exclude()
export class TaskCategoryRdo extends BaseRdo {

    @Expose()
    id: string;

    @Expose()
    title: string;

    @Expose()
    description?: string;

    @Expose()
    thumbnail?: string;
}