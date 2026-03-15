import { ExposeField } from "src/decorators/field.decorator";
import { DailyPlanRdo } from "./daily-plan.rdo";

export class DailyPlanDetailRdo extends DailyPlanRdo {

    @ExposeField()
    isTemplate: boolean;
}