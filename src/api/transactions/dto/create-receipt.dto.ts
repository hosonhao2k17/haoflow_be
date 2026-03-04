import { ReceiptStatus } from "src/common/constants/app.constant";
import { DateField, EnumField, NumberField, StringField, UrlField } from "src/decorators/field.decorator";


export class CreateReceiptDto {

    @UrlField()
    imageUrl: string;

    @StringField()
    ocrRawText: string;

    @NumberField()
    parsedAmount: number;

    @StringField()
    parsedMerchant: string;

    @DateField()
    parsedDate: Date;

    @EnumField(ReceiptStatus)
    status: ReceiptStatus
}