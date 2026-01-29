import { IntersectionType } from "@nestjs/swagger";
import { Gender, UserStatus } from "src/common/constants/app.constant";
import { CursorPaginationDto } from "src/common/dto/cursor-pagination.dto";

import { EnumField, StringField, UuidField } from "src/decorators/field.decorator";
import { ObjectLiteral } from "typeorm";
import { SelectQueryBuilder } from "typeorm/browser";


export class LoadMoreUserDto extends CursorPaginationDto{

    protected alias: string = 'user';
    
    @StringField({
        options: true
    })
    keyword?: string;

    @EnumField(Gender, {options: true})
    gender?: Gender;

    @EnumField(UserStatus, {options: true, swaggerOptions: {enum: UserStatus}})
    status?: UserStatus

    @UuidField({options: true})
    roleId: string;

    handleQueryBuilder<T extends ObjectLiteral>(queryBuilder: SelectQueryBuilder<T>): void {
        super.handleQueryBuilder(queryBuilder)
        if(this.keyword) {
            queryBuilder.andWhere(`${this.alias}.fullName LIKE :keyword`,{keyword: `%${this.keyword}%`})
        }
        if(this.gender) {
            queryBuilder.andWhere(`${this.alias}.gender = :gender`,{gender: this.gender})
        }
        if(this.status) {
            queryBuilder.andWhere(`${this.alias}.status = :status`,{status: this.status})
        }
        if(this.roleId) {
            queryBuilder.andWhere(`${this.alias}.roleId = :roleId`,{roleId: this.roleId})
        }
    }
    
}