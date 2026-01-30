import { Exclude, Expose, Type } from "class-transformer";
import { PermissionRdo } from "src/api/roles/rdo/permission.rdo";

@Exclude()
export class UserRoleRdo {

    @Expose()
    id: string;

    @Expose()
    name: string;

    @Expose()
    title: string;

    @Expose()
    @Type(() => PermissionRdo)
    permissions: PermissionRdo[];

}