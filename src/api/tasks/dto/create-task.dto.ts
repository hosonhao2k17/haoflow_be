import { Priority } from "src/common/constants/priority.constant";
import { DateField, EnumField, StringField, UuidField } from "src/decorators/field.decorator";


export class CreateTaskDto {

    @StringField()
    todo: string;

    @StringField() 
    description?: string;

    @EnumField(Priority, {options: true})
    priority?: Priority;

    @StringField()
    startTime: string;

    @StringField()
    endTime: string;

    @UuidField()
    categoryId: string;

    @UuidField()
    dailyPlanId: string;

}
