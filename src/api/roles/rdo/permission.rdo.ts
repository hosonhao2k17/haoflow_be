import { Exclude } from "class-transformer";
import { ExposeField } from "src/decorators/field.decorator";
import { PermissionAction } from "src/common/constants/app.constant";

@Exclude()
export class PermissionRdo {
    @ExposeField()
    id: string;

    @ExposeField()
    action: PermissionAction;

    @ExposeField()
    subject: string;
}