import { Expose } from "class-transformer";



export class StatsTaskRdo {

    @Expose()
    total: number;

    @Expose()
    done: number;

    @Expose()
    skipped: number;

    @Expose()
    todo: number;
    
    @Expose()
    streak: number;

    @Expose()
    doneProgress: number;

    @Expose()
    skipProgress: number
}