import { Exclude, Type } from "class-transformer";
import { ExposeField } from "src/decorators/field.decorator";
import { BaseRdo } from "src/common/rdo/base-response.rdo";
import { PermissionRdo } from "./permission.rdo";

@Exclude()
export class RoleRdo extends BaseRdo{

    @ExposeField()
    id: string;

    @ExposeField()
    name: string;

    @ExposeField()
    title: string;

    @ExposeField()
    description: string;

    @ExposeField()
    status: string;

    @ExposeField()
    @Type(() => PermissionRdo)
    permissions: PermissionRdo[];

}