import { IsOptional } from "class-validator";
import { NotificationType } from "src/common/constants/notification.constant";
import { EnumField, StringField } from "src/decorators/field.decorator";



export class CreateNotificationDto {


    @EnumField(NotificationType)
    type: NotificationType;

    @StringField()
    title: string;

    @StringField()
    body: string;

    @IsOptional()
    metadata?: Record<string, any>;

}