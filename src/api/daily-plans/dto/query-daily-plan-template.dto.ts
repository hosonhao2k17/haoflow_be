import { PickType } from "@nestjs/swagger";
import { QueryDailyPlanDto } from "./query-daily-plan.dto";
import { OffsetPaginationDto } from "src/common/dto/offset-pagination.dto";
import { StringField } from "src/decorators/field.decorator";
import { ObjectLiteral, SelectQueryBuilder } from "typeorm";

export class QueryDailyPlanTemplateDto extends OffsetPaginationDto {

    protected alias: string = 'daily-plan';

    @StringField({options: true})
    keyword?: string;

    handleQueryBuilder<T extends ObjectLiteral>(queryBuilder: SelectQueryBuilder<T>): void {
        super.handleQueryBuilder(queryBuilder);
        if(this.keyword) {
            queryBuilder.andWhere(`${this.alias}.title = :keyword`,{keyword: `%${this.keyword}%`})
        }
    }
}