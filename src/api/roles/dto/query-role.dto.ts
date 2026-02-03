import { Exclude } from "class-transformer";
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

    protected alias: string = 'role'

    @EnumField(RoleStatus, {options: true, swaggerOptions: {
        enum: RoleStatus
    }})
    status?: RoleStatus;

    @StringField({options: true})
    keyword?: string;

    @StringField({options: true})
    createdBy?: string;

    @StringField({options: true})
    updatedBy?: string

    

    handleQueryBuilder<T extends ObjectLiteral>(queryBuilder: SelectQueryBuilder<T>,): void {
        super.handleQueryBuilder(queryBuilder);
        if(this.status) {
            queryBuilder
            .andWhere(`${this.alias}.status = :status`,{status: this.status})
        }
        if(this.keyword) {
            queryBuilder
            .andWhere(`${this.alias}.name = :keyword OR ${this.alias}.title = :keyword`,{keyword: this.keyword})
        }
        if(this.createdBy) {
            queryBuilder.andWhere(`${this.alias}.createdBy = :createdBy`,{createdBy: this.createdBy})
        } 
        if(this.updatedBy) {
            queryBuilder.andWhere(`${this.alias}.updatedBy = :updatedBy`,{updatedBy: this.updatedBy})
        }
    }

}