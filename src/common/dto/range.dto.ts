import { DateField, NumberField } from "src/decorators/field.decorator";
import { AbstractQueryDto } from "./abstract-query.dto";
import { ObjectLiteral, SelectQueryBuilder } from "typeorm";
import { getCurrentRangeWeek } from "src/utils/date";


export class RangeDto extends AbstractQueryDto {
    protected alias: string;

    @DateField({options: true})
    startDate?: Date = getCurrentRangeWeek().startDate;

    @DateField({options: true}) 
    endDate?: Date = getCurrentRangeWeek().endDate;

    @NumberField({options: true})
    limit: 1000;

    handleQueryBuilder<T extends ObjectLiteral>(queryBuilder: SelectQueryBuilder<T>): void {
        queryBuilder.limit(this.limit);
        if(this.startDate) {
            queryBuilder.andWhere(`${this.alias}.createdAt > :startDate`,{startDate: this.startDate})
        }
        if(this.endDate) {
            queryBuilder.andWhere(`${this.alias}.createdAt < :endDate`,{endDate: this.endDate})
        }
    }
}