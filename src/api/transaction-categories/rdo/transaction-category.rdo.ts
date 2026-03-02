import { Exclude, Expose, Type } from "class-transformer";
import { TransactionCategoryType } from "src/common/constants/app.constant";
import { BaseRdo } from "src/common/rdo/base-response.rdo";

@Exclude()
export class TransactionCategoryRdo extends BaseRdo{

    @Expose()
    id: string;

    @Expose()
    type: TransactionCategoryType;

    @Expose()
    icon?: string;

    @Expose()
    color?: string;

    @Expose()
    @Type(() => TransactionCategoryRdo)
    childrens: TransactionCategoryRdo[]

    
}