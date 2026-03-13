import { UrlField } from "src/decorators/field.decorator";
import { CreateTransactionDto } from "./create-transaction.dto";
import { CreateReceiptDto } from "./create-receipt.dto";
import { Type } from "class-transformer";
import { ValidateNested } from "class-validator";
import { OmitType } from "@nestjs/swagger";



export class CreateFromReceiptDto extends OmitType(CreateTransactionDto, ['isRecurring']){

    @ValidateNested()
    @Type(() => CreateReceiptDto)
    receipt: CreateReceiptDto;
    
}