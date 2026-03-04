import { UrlField } from "src/decorators/field.decorator";



export class ReviewTransactionReceiptDto {

    @UrlField()
    imageUrl: string;
}