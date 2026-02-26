import { SortOrder } from "src/common/constants/app.constant";
import { RangeDto } from "src/common/dto/range.dto";
import { StringField } from "src/decorators/field.decorator";
import { ObjectLiteral, SelectQueryBuilder } from "typeorm";


export class QueryDailyPlanDto extends RangeDto {
    protected alias: string = 'daily-plan';

    @StringField({options: true})
    keyword?: string;

    @StringField({options: true})
    sortBy?: string = 'date';

    @StringField({options: true})
    sortOrder?: SortOrder = SortOrder.ASC

    handleQueryBuilder<T extends ObjectLiteral>(queryBuilder: SelectQueryBuilder<T>): void {
        super.handleQueryBuilder(queryBuilder);
        if(this.keyword) {
            queryBuilder.andWhere(`${this.alias}.title LIKE :keyword`,{keyword: `%${this.keyword}%`})
        }
    }


}