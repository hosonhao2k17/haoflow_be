import { Type } from "class-transformer";
import { UuidField } from "src/decorators/field.decorator";
import { CreateTaskDto } from "./create-task.dto";
import { OmitType } from "@nestjs/swagger";
import { IsArray } from "class-validator";


class TaskDto extends OmitType(CreateTaskDto,['dailyPlanId']) {

}

export class CreateMultiTaskDto {

    @UuidField()
    dailyPlanId: string;

    @IsArray()
    @Type(() => TaskDto)
    tasks: TaskDto[]
}