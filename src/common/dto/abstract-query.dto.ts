import { EnumField, StringField } from "src/decorators/field.decorator";
import { ToUpperCase } from "src/decorators/transform.decorator";
import { SortOrder } from "../constants/app.constant";
import { DEFAULT_SORT_BY, DEFAULT_SORT_ORDER } from "../constants/default.constant";
import { ISort } from "../interfaces/sort.interface";
import { SelectQueryBuilder,ObjectLiteral } from "typeorm";


export class AbstractQueryDto implements ISort {

    @StringField({options: true})
    createdBy?: string;

    @StringField({options: true})
    updatedBy?: string;

    @StringField({options: true, swaggerOptions: {default: 'createdAt'}})
    sortBy?: string = DEFAULT_SORT_BY;

    @ToUpperCase()
    @EnumField(SortOrder,{
        options: true, 
        swaggerOptions: {
            default: SortOrder.DESC
        }
    })
    sortOrder?: SortOrder = DEFAULT_SORT_ORDER;

    handleQueryBuilder<T extends ObjectLiteral>(
        queryBuilder: SelectQueryBuilder<T>,
        alias: string
    ) {
        queryBuilder.orderBy(`${alias}.${this.sortBy}`,this.sortOrder)
        if(this.createdBy) {
            queryBuilder.andWhere(`${alias}.createdBy = :createdBy`,{createdBy: this.createdBy})
        } 
        if(this.updatedBy) {
            queryBuilder.andWhere(`${alias}.updatedBy = :updatedBy`,{updatedBy: this.updatedBy})
        }

        return queryBuilder

    }
}