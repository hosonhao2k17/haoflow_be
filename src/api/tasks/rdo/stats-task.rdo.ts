import { ExposeField } from "src/decorators/field.decorator";

export class StatsTaskRdo {

    @ExposeField()
    total: number;

    @ExposeField()
    done: number;

    @ExposeField()
    skipped: number;

    @ExposeField()
    todo: number;

    @ExposeField()
    streak: number;

    @ExposeField()
    doneProgress: number;

    @ExposeField()
    skipProgress: number
}