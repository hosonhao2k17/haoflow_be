import { Exclude } from "class-transformer";
import { ExposeField } from "src/decorators/field.decorator";
import { TaskRdo } from "./task.rdo";

@Exclude()
export class SuggestTaskRdo extends TaskRdo {

    @ExposeField()
    categoryId: string;
}