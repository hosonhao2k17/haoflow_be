import { Exclude, Expose } from "class-transformer";
import { PermissionAction } from "src/common/constants/app.constant";

@Exclude()
export class PermissionRdo {
    @Expose()
    id: string;

    @Expose()
    action: PermissionAction;

    @Expose()
    subject: string;
}