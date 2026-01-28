import { NumberField } from "src/decorators/field.decorator";
import { DEFAULT_LIMIT, DEFAULT_PAGE } from "../constants/default.constant";
import { AbstractQueryDto } from "./abstract-query.dto";
import { ObjectLiteral, SelectQueryBuilder } from "typeorm";

export class OffsetPaginationDto extends AbstractQueryDto{

    @NumberField({options: true})
    page: number = DEFAULT_PAGE;

    @NumberField({options: true})
    limit: number = DEFAULT_LIMIT;

    getOffset(): number {
        return (this.page - 1 ) *  this.limit;
    }

    handleQueryBuilder<T extends ObjectLiteral>(queryBuilder: SelectQueryBuilder<T>, alias: string): SelectQueryBuilder<T> {
        super.handleQueryBuilder(queryBuilder, alias);
        queryBuilder
            .limit(this.limit)
            .offset(this.getOffset())
        return queryBuilder
    }
}