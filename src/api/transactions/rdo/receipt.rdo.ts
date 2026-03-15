import { ExposeField } from "src/decorators/field.decorator";
import { ReceiptStatus } from "src/common/constants/app.constant";
import { BaseRdo } from "src/common/rdo/base-response.rdo";

export class ReceiptRdo extends BaseRdo {

    @ExposeField()
    id: string;

    @ExposeField()
    imageUrl: string;

    @ExposeField()
    ocrRawText?: string;

    @ExposeField()
    parsedAmount: number;

    @ExposeField()
    parsedMerchant?: string;

    @ExposeField()
    parsedDate?: Date;

    @ExposeField()
    status: ReceiptStatus;
}