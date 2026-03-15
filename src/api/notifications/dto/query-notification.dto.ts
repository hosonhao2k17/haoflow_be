import { OffsetPaginationDto } from "src/common/dto/offset-pagination.dto";
import { BooleanField, StringField } from "src/decorators/field.decorator";
import { ObjectLiteral, SelectQueryBuilder } from "typeorm";

export class QueryNotificationDto extends OffsetPaginationDto{

    protected alias: string = 'notification';

    @StringField({options: true})
    keyword?: string;

    @BooleanField({options: true})
    isRead?: boolean;

    handleQueryBuilder<T extends ObjectLiteral>(queryBuilder: SelectQueryBuilder<T>): void {
        super.handleQueryBuilder(queryBuilder)
        if(this.keyword) {
            queryBuilder.andWhere(`${this.getAlias()}.title = :keyword`,{keyword: `%${this.keyword}%`})
        }
        if(this.isRead !== undefined) {
            queryBuilder.andWhere(`${this.getAlias()}.isRead = :isRead`,{isRead: this.isRead})
        }
    }
}