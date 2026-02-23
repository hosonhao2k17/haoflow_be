import { EnumField, StringField } from "src/decorators/field.decorator";
import { ToUpperCase } from "src/decorators/transform.decorator";
import { SortOrder } from "../constants/app.constant";
import { DEFAULT_SORT_BY, DEFAULT_SORT_ORDER } from "../constants/default.constant";
import { ISort } from "../interfaces/sort.interface";
import { SelectQueryBuilder,ObjectLiteral } from "typeorm";
import { Allow } from "class-validator";


export abstract class AbstractQueryDto implements ISort {

    @Allow()
    protected abstract readonly alias: string;

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

    getAlias(): string {
        return this.alias;
    }

    handleQueryBuilder<T extends ObjectLiteral>(
        queryBuilder: SelectQueryBuilder<T>,
    ) {
        queryBuilder.addOrderBy(`${this.alias}.${this.sortBy}`,this.sortOrder)
    }
}