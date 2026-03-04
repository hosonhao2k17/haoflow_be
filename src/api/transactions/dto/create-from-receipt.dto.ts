import { UrlField } from "src/decorators/field.decorator";
import { CreateTransactionDto } from "./create-transaction.dto";
import { CreateReceiptDto } from "./create-receipt.dto";
import { Type } from "class-transformer";
import { ValidateNested } from "class-validator";



export class CreateFromReceiptDto extends CreateTransactionDto{

    @ValidateNested()
    @Type(() => CreateReceiptDto)
    receipt: CreateReceiptDto;
    
}