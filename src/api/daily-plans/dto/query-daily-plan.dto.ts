import { OffsetPaginationDto } from "src/common/dto/offset-pagination.dto";


export class QueryDailyPlanDto extends OffsetPaginationDto {
    protected alias: string = 'daily-plan';
}