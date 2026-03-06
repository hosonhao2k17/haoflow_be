import { Exclude, Expose } from "class-transformer";
import { TaskRdo } from "./task.rdo";

@Exclude()
export class SuggestTaskRdo extends TaskRdo {
    
    @Expose()
    categoryId: string;
}