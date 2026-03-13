import { startOfDay, endOfDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear, endOfYear } from "date-fns";
import { StatsType } from "src/common/constants/stats.constant";
import { EnumField } from "src/decorators/field.decorator";

interface Range<T> {
    start: T;
    end: T;
}

export class QueryTaskStatsDto {

    @EnumField(StatsType, {options: true})
    type?: StatsType;

    getRange(): Range<Date> {
        const now = new Date();

        switch (this.type) {
            case StatsType.DAY:
                return { start: startOfDay(now), end: endOfDay(now) };

            case StatsType.WEEK:
                return { start: startOfWeek(now, { weekStartsOn: 1 }), end: endOfWeek(now, { weekStartsOn: 1 }) };

            case StatsType.MONTH:
                return { start: startOfMonth(now), end: endOfMonth(now) };

            case StatsType.YEAR:
                return { start: startOfYear(now), end: endOfYear(now) };

            default:
                return { start: startOfWeek(now, { weekStartsOn: 1 }), end: endOfWeek(now, { weekStartsOn: 1 }) };
        }
    }
}