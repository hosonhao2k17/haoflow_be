import { TransactionCategoryType } from "src/common/constants/app.constant";
import { OffsetPaginationDto } from "src/common/dto/offset-pagination.dto";
import { EnumField, StringField, UuidField } from "src/decorators/field.decorator";
import { ObjectLiteral, SelectQueryBuilder } from "typeorm";



export class QueryTransactionCategoryDto extends OffsetPaginationDto {
    protected alias: string = 'category';

    @StringField({options: true})
    keyword?: string;

    @EnumField(TransactionCategoryType,{options: true})
    type: TransactionCategoryType;

    handleQueryBuilder<T extends ObjectLiteral>(queryBuilder: SelectQueryBuilder<T>): void {
        super.handleQueryBuilder(queryBuilder)
        if(this.keyword) {
            queryBuilder.andWhere(`${this.alias}.title LIKE :keyword`,{keyword: `%${this.keyword}%`})
        }
        if(this.type) {
            queryBuilder.andWhere(`${this.alias}.type = :type`,{type: this.type})
        }
    }
}