import { Exclude } from "class-transformer";
import { AccountStatus, AccountType } from "src/common/constants/account.constant";
import { BaseRdo } from "src/common/rdo/base-response.rdo";
import { ExposeField } from "src/decorators/field.decorator";

@Exclude()
export class AccountRdo extends BaseRdo {

    @ExposeField()
    id: string;

    @ExposeField()
    title: string;

    @ExposeField()
    type: AccountType;

    @ExposeField()
    balance: number;

    @ExposeField()
    color?: string;

    @ExposeField()
    logo?: string;

    @ExposeField()
    status: AccountStatus
}