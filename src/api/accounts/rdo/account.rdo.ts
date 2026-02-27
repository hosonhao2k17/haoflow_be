import { Expose } from "class-transformer";
import { AccountStatus, AccountType } from "src/common/constants/account.constant";
import { BaseRdo } from "src/common/rdo/base-response.rdo";


export class AccountRdo extends BaseRdo {

    @Expose()
    id: string;

    @Expose()
    title: string;

    @Expose()
    type: AccountType;

    @Expose()
    balance: number;

    @Expose()
    color?: string;

    @Expose()
    icon?: string;

    @Expose()
    status: AccountStatus
}