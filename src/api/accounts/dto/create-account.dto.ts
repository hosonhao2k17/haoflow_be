import { AccountStatus, AccountType } from "src/common/constants/account.constant";
import { EnumField, NumberField, StringField } from "src/decorators/field.decorator";


export class CreateAccountDto {

    @StringField()
    title: string;

    @EnumField(AccountType,{options: true})
    type: AccountType;

    @NumberField()
    balance: number;

    @EnumField(AccountStatus,{options: true})
    status: AccountStatus;

    @StringField({
        options: true
    })
    color?: string; 

    @StringField({
        options: true
    })
    icon?: string;
}
