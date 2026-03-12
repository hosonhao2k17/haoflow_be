import { Transform } from "class-transformer";
import { BudgetPeriod } from "src/common/constants/app.constant";
import { DateField, EnumField, NumberField, StringField, UuidField } from "src/decorators/field.decorator";
import {startOfMonth} from 'date-fns'

export class CreateBudgetDto {

    @NumberField({min: 0})
    amount: number;

    @UuidField()
    categoryId: string;

    @EnumField(BudgetPeriod,{options: true, swaggerOptions: {enum: BudgetPeriod}})
    period?: BudgetPeriod;

    @DateField()
    @Transform(({value}) => {
        
        return startOfMonth(value)
    })
    month: Date;

    @NumberField({min: 0, max: 100})
    alertThreshold: number
}
