import { Exclude, Type } from "class-transformer";
import { ExposeField } from "src/decorators/field.decorator";
import { TransactionCategoryType } from "src/common/constants/app.constant";
import { BaseRdo } from "src/common/rdo/base-response.rdo";

@Exclude()
export class TransactionCategoryRdo extends BaseRdo{

    @ExposeField()
    id: string;

    @ExposeField()
    title: string;

    @ExposeField()
    type: TransactionCategoryType;

    @ExposeField()
    icon?: string;

    @ExposeField()
    color?: string;

    @ExposeField()
    @Type(() => TransactionCategoryRdo)
    childrens: TransactionCategoryRdo[]

}