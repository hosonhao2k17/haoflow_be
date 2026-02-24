import { DateField, MilitaryTimeField, StringField } from "src/decorators/field.decorator";
import { Type } from "class-transformer";
import { ValidateNested } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";


export class CreateDailyPlanDto {

    @DateField()
    date: Date;

    @StringField()
    title: string;

    @StringField({options: true})
    description: string;

    @MilitaryTimeField()
    startTime: string;

    @MilitaryTimeField()
    endTime: string;
}
