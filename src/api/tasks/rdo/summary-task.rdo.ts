import { ExposeField } from "src/decorators/field.decorator";

export class SummaryTaskRdo {

    @ExposeField()
    totalTask: number;

    @ExposeField()
    completedTasks: number;

    @ExposeField()
    progressPercent: number;
}