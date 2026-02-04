import { DateField, StringField } from "src/decorators/field.decorator";
import { CreateTimeBlockDto } from "./create-time-block.dto";
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

    @ValidateNested()
    @ApiProperty({ type: () => CreateTimeBlockDto })
    @Type(() => CreateTimeBlockDto)
    timeBlock: CreateTimeBlockDto
}
