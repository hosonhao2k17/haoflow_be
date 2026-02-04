import { DateField } from "src/decorators/field.decorator";



export class CreateTimeBlockDto {

    @DateField()
    startTime: Date;

    @DateField()
    endTime: Date;
}