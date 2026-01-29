import { NumberField, StringField } from "src/decorators/field.decorator";
import { DEFAULT_FIELD_CURSOR, DEFAULT_LIMIT } from "../constants/default.constant";
import { AbstractQueryDto } from "./abstract-query.dto";
import { ObjectLiteral, SelectQueryBuilder } from "typeorm";
import { Allow } from "class-validator";
import { SortOrder } from "../constants/app.constant";


export class CursorPaginationDto extends AbstractQueryDto {
    protected alias: string;

    @Allow()
    cursorField: string = DEFAULT_FIELD_CURSOR;

    @NumberField({options: true})
    limit: number = DEFAULT_LIMIT;

    @StringField({options: true})
    afterCursor?: string;

    @StringField({options: true})
    beforeCursor?: string;

    handleQueryBuilder<T extends ObjectLiteral>(queryBuilder: SelectQueryBuilder<T>): void {
        super.handleQueryBuilder(queryBuilder)
        queryBuilder.limit(this.limit)
        if(this.beforeCursor) {
            queryBuilder.andWhere(`${this.alias}.${this.cursorField} < :beforeCursor`,{beforeCursor: this.beforeCursor})
        }
        if(this.afterCursor) {
            queryBuilder.andWhere(`${this.alias}.${this.cursorField} > :afterCursor`,{afterCursor: this.afterCursor})
        }

    }


}