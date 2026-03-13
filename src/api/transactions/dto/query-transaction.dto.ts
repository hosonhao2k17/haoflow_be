import { SortOrder, TransactionSource, TransactionType } from "src/common/constants/app.constant";
import { CursorPaginationDto } from "src/common/dto/cursor-pagination.dto";
import { DateField, EnumField, NumberField, StringField, UuidField } from "src/decorators/field.decorator";
import { ObjectLiteral, SelectQueryBuilder } from "typeorm";

export class QueryTransactionDto extends CursorPaginationDto {
    protected alias = 'transaction';

    @EnumField(TransactionType, { options: true, swaggerOptions: { enum: TransactionType } })
    type?: TransactionType;

    @NumberField({ options: true, min: 0 })
    minAmount?: number;

    @NumberField({ options: true })
    maxAmount?: number;

    @StringField({ options: true })
    merchant?: string;

    @DateField({ options: true })
    dateFrom?: string;

    @DateField({ options: true })
    dateTo?: string;

    @UuidField({ options: true })
    categoryId?: string;

    @UuidField({ options: true })
    accountId?: string;

    @EnumField(TransactionSource, { options: true, swaggerOptions: { enum: TransactionSource } })
    source?: TransactionSource;

    @StringField({options: true})
    sortBy?: string = 'transactionDate';

    @EnumField(SortOrder, {options: true})
    sortOrder?: SortOrder = SortOrder.DESC;

    handleQueryBuilder<T extends ObjectLiteral>(qb: SelectQueryBuilder<T>): void {
        super.handleQueryBuilder(qb);

        const a = this.alias;

        if (this.type) qb.andWhere(`${a}.type = :type`,  { type: this.type });
        if (this.source) qb.andWhere(`${a}.source = :source`, { source: this.source });
        if (this.merchant) qb.andWhere(`${a}.merchant LIKE :merchant`,{ merchant: `%${this.merchant}%` });
        if (this.accountId) qb.andWhere(`${a}.accountId = :accountId`,{ accountId: this.accountId });
        if (this.categoryId) qb.andWhere(`${a}.categoryId = :categoryId`,{ categoryId: this.categoryId });
        if (this.minAmount) qb.andWhere(`${a}.amount >= :minAmount`,{ minAmount: this.minAmount });
        if (this.maxAmount) qb.andWhere(`${a}.amount <= :maxAmount`, { maxAmount: this.maxAmount });
        if (this.dateFrom) qb.andWhere(`DATE(${a}.transactionDate) >= DATE(:dateFrom)`, { dateFrom: this.dateFrom });
        if (this.dateTo) qb.andWhere(`DATE(${a}.transactionDate) <= DATE(:dateTo)`, { dateTo: this.dateTo });
    }
}