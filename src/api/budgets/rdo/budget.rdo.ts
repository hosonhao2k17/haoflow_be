import { Exclude, Expose, Type } from "class-transformer";
import { TransactionCategoryRdo } from "src/api/transaction-categories/rdo/transaction-category.rdo";
import { BudgetPeriod } from "src/common/constants/app.constant";
import { BaseRdo } from "src/common/rdo/base-response.rdo";


@Exclude()
export class BudgetRdo extends BaseRdo {

    @Expose()
    id: string;

    @Expose()
    amount: number;

    @Expose()
    spentAmount: number;

    @Expose()
    @Type(() => TransactionCategoryRdo)
    category: TransactionCategoryRdo;

    @Expose()
    period: BudgetPeriod;

    @Expose()
    month: Date;

    @Expose()
    alertThreshold: number;
}