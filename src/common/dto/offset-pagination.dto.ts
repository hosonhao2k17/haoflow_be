import { NumberField } from "src/decorators/field.decorator";
import { DEFAULT_LIMIT, DEFAULT_PAGE } from "../constants/default.constant";
import { AbstractQueryDto } from "./abstract-query.dto";
import { ObjectLiteral, SelectQueryBuilder } from "typeorm";

export class OffsetPaginationDto extends AbstractQueryDto{
    protected alias: string;
    

    @NumberField({options: true})
    page: number = DEFAULT_PAGE;

    @NumberField({options: true})
    limit: number = DEFAULT_LIMIT;

    getOffset(): number {
        return (this.page - 1 ) *  this.limit;
    }

    handleQueryBuilder<T extends ObjectLiteral>(queryBuilder: SelectQueryBuilder<T>,): void {
        super.handleQueryBuilder(queryBuilder);
        queryBuilder
            .limit(this.limit)
            .offset(this.getOffset())
    }
}