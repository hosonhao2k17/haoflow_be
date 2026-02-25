
import { PartialType } from '@nestjs/swagger';
import { CreateTaskDto } from './create-task.dto';
import { TaskStatus } from 'src/common/constants/app.constant';
import { EnumField } from 'src/decorators/field.decorator';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {

    @EnumField(TaskStatus,{options: true})
    status?: TaskStatus
}
