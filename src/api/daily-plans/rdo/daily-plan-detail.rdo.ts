import { Expose } from "class-transformer";
import { DailyPlanRdo } from "./daily-plan.rdo";


export class DailyPlanDetailRdo extends DailyPlanRdo {

    @Expose()
    isTemplate: boolean;
}