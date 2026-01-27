import { Exclude, Expose } from "class-transformer";
import { ActionPermission } from "src/common/constants/app.constant";

@Exclude()
export class PermissionRdo {
    @Expose()
    id: string;

    @Expose()
    action: ActionPermission;

    @Expose()
    subject: string;
}