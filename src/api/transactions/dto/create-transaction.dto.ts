import { TransactionSource, TransactionType } from "src/common/constants/app.constant";
import { BooleanField, DateField, EnumField, NumberField, StringField, UuidField } from "src/decorators/field.decorator";


export class CreateTransactionDto {

    @UuidField()
    categoryId: string;

    @UuidField()
    accountId: string;

    @EnumField(TransactionType)
    type: TransactionType;

    @NumberField()
    amount: number;

    @StringField({options: true})
    description?: string;

    @StringField({
        options: true
    })
    merchant?: string;

    @DateField()
    transactionDate: Date;

    @BooleanField({options: true})
    isRecurring?: boolean;

}
