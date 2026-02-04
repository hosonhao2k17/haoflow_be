import { DateField, StringField, UuidField } from "src/decorators/field.decorator";


export class CreateTaskDto {

    @StringField()
    todo: string;

    @DateField()
    startTime: Date;

    @DateField()
    endTime: Date;

    @UuidField()
    categoryId: string;

    @UuidField()
    dailyPlanId: string;

}
