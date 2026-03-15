import { StringField, UuidField } from "src/decorators/field.decorator";



export class RemindTaskDto {

    @UuidField()
    dailyPlanId: string;

    @UuidField()
    userId: string;

    @StringField()
    title: string;

    @StringField()
    body: string;
}