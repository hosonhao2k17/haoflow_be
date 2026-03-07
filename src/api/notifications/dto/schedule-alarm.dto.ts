import { DateField, MilitaryTimeField, StringField } from "src/decorators/field.decorator";



export class ScheduleAlarmDto {

    @MilitaryTimeField()
    startTime: string;

    @DateField()
    date: string;

    @StringField()
    title: string;

    @StringField()
    id: string;
}