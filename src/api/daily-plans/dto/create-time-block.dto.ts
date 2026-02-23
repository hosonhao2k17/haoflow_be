import { MilitaryTimeField, StringField } from "src/decorators/field.decorator";



export class CreateTimeBlockDto {

    @MilitaryTimeField()
    startTime: string;

    @MilitaryTimeField()
    endTime: string;
}