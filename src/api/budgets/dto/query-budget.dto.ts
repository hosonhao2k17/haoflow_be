import { BudgetPeriod } from "src/common/constants/app.constant";
import { OffsetPaginationDto } from "src/common/dto/offset-pagination.dto";
import { DateField, EnumField, NumberField, UuidField } from "src/decorators/field.decorator";
import { ObjectLiteral, SelectQueryBuilder } from "typeorm";



export class QueryBudgetDto extends OffsetPaginationDto {

    protected alias: string = 'budget';

    @UuidField({options: true})
    categoryId?: string;

    @EnumField(BudgetPeriod, {options: true})
    period?: BudgetPeriod;

    @DateField({options: true})
    startDate?: Date;

    @NumberField({ options: true })
    minAmount?: number;

    @NumberField({ options: true })
    maxAmount?: number;

    handleQueryBuilder<T extends ObjectLiteral>(queryBuilder: SelectQueryBuilder<T>): void {
        super.handleQueryBuilder(queryBuilder)

        if (this.categoryId) {
            queryBuilder.andWhere(`${this.alias}.categoryId = :categoryId`, { categoryId: this.categoryId });
        }

        if (this.period) {
            queryBuilder.andWhere(`${this.alias}.period = :period`, { period: this.period });
        }

        if (this.startDate) {
            queryBuilder.andWhere(
                `MONTH(${this.alias}.startDate) = MONTH(:startDate) AND YEAR(${this.alias}.startDate) = YEAR(:startDate)`,
                { startDate: this.startDate }  
            );
        }

        if (this.minAmount) {
            queryBuilder.andWhere(`${this.alias}.amount >= :minAmount`, { minAmount: this.minAmount });
        }

        if (this.maxAmount) {
            queryBuilder.andWhere(`${this.alias}.amount <= :maxAmount`, { maxAmount: this.maxAmount });
        }
    }
}