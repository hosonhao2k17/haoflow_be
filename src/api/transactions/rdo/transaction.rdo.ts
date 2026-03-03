import { Exclude, Expose, Type } from "class-transformer";
import { AccountRdo } from "src/api/accounts/rdo/account.rdo";
import { TransactionCategoryRdo } from "src/api/transaction-categories/rdo/transaction-category.rdo";
import { TransactionSource, TransactionType } from "src/common/constants/app.constant";
import { BaseRdo } from "src/common/rdo/base-response.rdo";

@Exclude()
export class TransactionRdo extends BaseRdo {

    @Expose()
    id: string;

    @Expose()
    @Type(() => TransactionCategoryRdo)
    category: TransactionCategoryRdo;  
    
    @Expose()
    @Type(() => AccountRdo)
    account: AccountRdo;

    @Expose()
    type: TransactionType;

    @Expose()
    amount: number;

    @Expose()
    description?: string;

    @Expose()
    merchant?: string;

    @Expose()
    transactionDate: Date;

    @Expose()
    source: TransactionSource;

    @Expose()
    isRecurring: boolean;
}