import { IsEnum } from "class-validator";
import { SortOrder } from "src/common/constants/app.constant";
import { DEFAULT_SORT_BY, DEFAULT_SORT_ORDER } from "src/common/constants/default.constant";
import { RoleStatus } from "src/common/constants/status.constant";
import { OffsetPaginationDto } from "src/common/dto/offset-pagination.dto";
import { ISearch } from "src/common/interfaces/search.interface";
import { ISort } from "src/common/interfaces/sort.interface";
import { EnumField, StringField } from "src/decorators/field.decorator";
import { ToUpperCase } from "src/decorators/transform.decorator";
import { ObjectLiteral, SelectQueryBuilder } from "typeorm";



export class QueryRoleDto extends OffsetPaginationDto implements ISearch {


    @EnumField(RoleStatus, {options: true, swaggerOptions: {
        enum: RoleStatus
    }})
    status?: RoleStatus;

    @StringField({options: true})
    keyword?: string;

    handleQueryBuilder<T extends ObjectLiteral>(queryBuilder: SelectQueryBuilder<T>, alias: string): SelectQueryBuilder<T> {
        super.handleQueryBuilder(queryBuilder, alias);
        if(this.status) {
            queryBuilder
            .andWhere(`${alias}.status = :status`,{status: this.status})
        }
        if(this.keyword) {
            queryBuilder
            .andWhere(`${alias}.name = :keyword OR ${alias}.title = :keyword`,{keyword: this.keyword})
        }
        return queryBuilder
    }

}