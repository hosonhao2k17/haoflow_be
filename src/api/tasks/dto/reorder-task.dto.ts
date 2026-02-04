import { PickType } from "@nestjs/swagger";
import { UpdateTaskDto } from "./update-task.dto";
import { NumberField, UuidField } from "src/decorators/field.decorator";


export class ReorderTaskDto {

    @UuidField()
    dailyPlanId: string;

    @UuidField({each: true})
    taskIds:  string[];
}