import { UrlField } from "src/decorators/field.decorator";

export class CreateReceiptDto {

    @UrlField()
    imageUrl: string;
}
