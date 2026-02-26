import { Priority } from "src/common/constants/priority.constant";
import { DateField, EnumField, MilitaryTimeField, StringField, UuidField } from "src/decorators/field.decorator";


export class CreateTaskDto {

    @StringField()
    todo: string;

    @StringField({options: true}) 
    description?: string;

    @EnumField(Priority, {options: true})
    priority?: Priority;

    @MilitaryTimeField()
    startTime: string;

    @MilitaryTimeField()
    endTime: string;

    @UuidField({options: true})
    categoryId?: string;

    @UuidField()
    dailyPlanId: string;

}
