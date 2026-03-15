import { Exclude, Type } from "class-transformer";
import { ExposeField } from "src/decorators/field.decorator";
import { AccountRdo } from "src/api/accounts/rdo/account.rdo";
import { TransactionCategoryRdo } from "src/api/transaction-categories/rdo/transaction-category.rdo";
import { TransactionSource, TransactionType } from "src/common/constants/app.constant";
import { BaseRdo } from "src/common/rdo/base-response.rdo";
import { ReceiptRdo } from "./receipt.rdo";

@Exclude()
export class TransactionRdo extends BaseRdo {

    @ExposeField()
    id: string;

    @ExposeField()
    @Type(() => TransactionCategoryRdo)
    category: TransactionCategoryRdo;

    @ExposeField()
    @Type(() => AccountRdo)
    account: AccountRdo;

    @ExposeField()
    type: TransactionType;

    @ExposeField()
    amount: number;

    @ExposeField()
    description?: string;

    @ExposeField()
    merchant?: string;

    @ExposeField()
    transactionDate: Date;

    @ExposeField()
    source: TransactionSource;

    @ExposeField()
    isRecurring: boolean;

    @ExposeField()
    @Type(() => ReceiptRdo)
    receipt?: ReceiptRdo;
}