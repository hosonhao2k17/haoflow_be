import { Exclude, Type } from "class-transformer";
import { ExposeField } from "src/decorators/field.decorator";
import { TransactionCategoryRdo } from "src/api/transaction-categories/rdo/transaction-category.rdo";
import { BudgetPeriod } from "src/common/constants/app.constant";
import { BaseRdo } from "src/common/rdo/base-response.rdo";

@Exclude()
export class BudgetRdo extends BaseRdo {

    @ExposeField()
    id: string;

    @ExposeField()
    amount: number;

    @ExposeField()
    spentAmount: number;

    @ExposeField()
    @Type(() => TransactionCategoryRdo)
    category: TransactionCategoryRdo;

    @ExposeField()
    period: BudgetPeriod;

    @ExposeField()
    startDate: Date;

    @ExposeField()
    alertThreshold: number;
}