import { OmitType } from "@nestjs/swagger";
import { TransactionRdo } from "./transaction.rdo";
import { Exclude, Expose, Type } from "class-transformer";
import { ReceiptRdo } from "./receipt.rdo";


export class ReviewTransactionReceiptRdo extends OmitType(TransactionRdo, ['id','category','account','createdAt','updatedAt']) {

    @Expose()
    categoryId: string;

    @Expose()
    accountId: string;

}