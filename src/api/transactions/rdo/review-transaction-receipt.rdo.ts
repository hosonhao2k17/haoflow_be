import { OmitType } from "@nestjs/swagger";
import { TransactionRdo } from "./transaction.rdo";
import { ExposeField } from "src/decorators/field.decorator";

export class ReviewTransactionReceiptRdo extends OmitType(TransactionRdo, ['id','category','account','createdAt','updatedAt']) {

    @ExposeField()
    categoryId: string;

    @ExposeField()
    accountId: string;

}