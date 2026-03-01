import { AccountType } from "src/common/constants/account.constant";
import { OffsetPaginationDto } from "src/common/dto/offset-pagination.dto";
import { EnumField, NumberField, StringField } from "src/decorators/field.decorator";
import { ObjectLiteral, SelectQueryBuilder } from "typeorm";


export class QueryAccountDto extends OffsetPaginationDto {


    protected alias: string = 'accounts';

    @StringField({options: true})
    keyword?: string;

    @EnumField(AccountType,{options: true, swaggerOptions: {enum: AccountType}})
    type?: AccountType;

    handleQueryBuilder<T extends ObjectLiteral>(queryBuilder: SelectQueryBuilder<T>): void {
        super.handleQueryBuilder(queryBuilder);
        if(this.keyword) {
            queryBuilder.andWhere(`${this.alias}.title LIKE :keyword`,{keyword: `%${this.keyword}%`})
        }
        if(this.type) {
            queryBuilder.andWhere(`${this.alias}.type = :type`,{type: this.type})
        }
    }

}