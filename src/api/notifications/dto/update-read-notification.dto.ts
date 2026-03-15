import { BooleanField } from "src/decorators/field.decorator";




export class UpdateReadNotificationDto {

    @BooleanField()
    isRead: boolean;
    
}