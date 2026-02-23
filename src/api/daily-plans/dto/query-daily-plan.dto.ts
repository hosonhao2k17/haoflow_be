import { CursorPaginationDto } from "src/common/dto/cursor-pagination.dto";
import { OffsetPaginationDto } from "src/common/dto/offset-pagination.dto";
import { StringField } from "src/decorators/field.decorator";
import { ObjectLiteral, SelectQueryBuilder } from "typeorm";


export class QueryDailyPlanDto extends CursorPaginationDto {
    protected alias: string = 'daily-plan';

    limit: number = 7;

    @StringField({options: true})
    keyword?: string;

    handleQueryBuilder<T extends ObjectLiteral>(queryBuilder: SelectQueryBuilder<T>): void {
        super.handleQueryBuilder(queryBuilder);
        if(this.keyword) {
            queryBuilder.andWhere(`${this.alias}.title LIKE :keyword`,{keyword: `%${this.keyword}%`})
        }
    }


}