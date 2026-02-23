import { Expose } from "class-transformer";


export class SummaryTaskRdo {

    @Expose()
    totalTask: number;

    @Expose()
    completedTasks: number;

    @Expose()
    progressPercent: number;
}