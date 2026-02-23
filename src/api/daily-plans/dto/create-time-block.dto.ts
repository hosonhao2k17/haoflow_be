import { DateField, StringField } from "src/decorators/field.decorator";



export class CreateTimeBlockDto {

    @StringField()
    startTime: string;

    @StringField()
    endTime: string;
}