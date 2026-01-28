import { Gender, SortOrder, UserStatus } from "src/common/constants/app.constant";
import { OffsetPaginationDto } from "src/common/dto/offset-pagination.dto";
import { ISearch } from "src/common/interfaces/search.interface";
import { ISort } from "src/common/interfaces/sort.interface";
import { EnumField, StringField, UuidField } from "src/decorators/field.decorator";

import { plainToInstance, Transform, Type } from "class-transformer";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, ValidateNested } from "class-validator";
import { ObjectLiteral, SelectQueryBuilder } from "typeorm";



export class QueryUserDto extends OffsetPaginationDto {

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