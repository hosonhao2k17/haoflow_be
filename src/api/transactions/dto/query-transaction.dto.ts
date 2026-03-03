import { TransactionSource, TransactionType } from "src/common/constants/app.constant";
import { CursorPaginationDto } from "src/common/dto/cursor-pagination.dto";
import { DateField, EnumField, NumberField, StringField } from "src/decorators/field.decorator";
import { ObjectLiteral, SelectQueryBuilder } from "typeorm";


export class QueryTransactionDto extends CursorPaginationDto {
    protected alias: string = 'transaction';

    @EnumField(TransactionType, {options: true, swaggerOptions: {enum: TransactionType}})
    type?: TransactionType;
    
    @NumberField({options: true, min: 0})
    minAmount?: number;

    @NumberField({options: true})
    maxAmount?: number;

    @StringField({options: true})
    merchant?: string;

    @DateField({options: true})
    transactionDate?: Date;

    @EnumField(TransactionSource, {options: true, swaggerOptions: {enum: TransactionSource}})
    source?: TransactionSource;


    handleQueryBuilder<T extends ObjectLiteral>(queryBuilder: SelectQueryBuilder<T>): void {
        super.handleQueryBuilder(queryBuilder);

        if (this.type) {
            queryBuilder.andWhere(`${this.alias}.type = :type`, { type: this.type });
        }

        if (this.minAmount) {
            queryBuilder.andWhere(`${this.alias}.amount >= :minAmount`, { minAmount: this.minAmount });
        }

        if (this.maxAmount) {
            queryBuilder.andWhere(`${this.alias}.amount <= :maxAmount`, { maxAmount: this.maxAmount });
        }

        if (this.merchant) {
            queryBuilder.andWhere(`${this.alias}.merchant LIKE :merchant`, { merchant: `%${this.merchant}%` });
        }

        if (this.transactionDate) {
            queryBuilder.andWhere(`DATE(${this.alias}.transactionDate) = DATE(:transactionDate)`, { transactionDate: this.transactionDate });
        }

        if (this.source) {
            queryBuilder.andWhere(`${this.alias}.source = :source`, { source: this.source });
        }
    }

}