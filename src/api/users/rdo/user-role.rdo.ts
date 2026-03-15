import { Exclude, Type } from "class-transformer";
import { ExposeField } from "src/decorators/field.decorator";
import { PermissionRdo } from "src/api/roles/rdo/permission.rdo";

@Exclude()
export class UserRoleRdo {

    @ExposeField()
    id: string;

    @ExposeField()
    name: string;

    @ExposeField()
    title: string;

    @ExposeField()
    @Type(() => PermissionRdo)
    permissions: PermissionRdo[];

}