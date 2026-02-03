import { OffsetPaginationDto } from "src/common/dto/offset-pagination.dto";
import { StringField } from "src/decorators/field.decorator";
import { ObjectLiteral, SelectQueryBuilder } from "typeorm";


export class QueryTaskCategoryDto extends OffsetPaginationDto {

    protected alias: string = 'task-category';

    @StringField({options: true})
    keyword?: string;

    handleQueryBuilder<T extends ObjectLiteral>(queryBuilder: SelectQueryBuilder<T>): void {
        super.handleQueryBuilder(queryBuilder);
        if(this.keyword) {
            queryBuilder.andWhere(`${this.alias}.title LIKE :keyword`,{keyword: `%${this.keyword}%`})
        }
    }
}