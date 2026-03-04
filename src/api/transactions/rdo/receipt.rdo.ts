import { Expose } from "class-transformer";
import { ReceiptStatus } from "src/common/constants/app.constant";
import { BaseRdo } from "src/common/rdo/base-response.rdo";



export class ReceiptRdo extends BaseRdo {

    @Expose()
    id: string;

    @Expose()
    imageUrl: string;

    @Expose()
    ocrRawText?: string;

    @Expose()
    parsedAmount: number;
    
    @Expose()
    parsedMerchant?: string;

    @Expose()
    parsedDate?: Date;

    @Expose()
    status: ReceiptStatus;
}