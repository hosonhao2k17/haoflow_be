import { TransactionCategoryType } from "src/common/constants/app.constant";
import { EnumField, StringField, UuidField } from "src/decorators/field.decorator";



export class CreateTransactionCategoryDto {

    @StringField()
    title: string;

    @EnumField(TransactionCategoryType)
    type: TransactionCategoryType;

    @StringField({options: true})
    icon?: string;

    @StringField({options: true})
    color?: string;

    @UuidField({options: true})
    parentId?: string;

}
