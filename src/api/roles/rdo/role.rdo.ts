import { Exclude, Expose, Type } from "class-transformer";
import { BaseRdo } from "src/common/rdo/base-response.rdo";
import { PermissionRdo } from "./permission.rdo";

@Exclude()
export class RoleRdo extends BaseRdo{

    @Expose()
    id: string;

    @Expose()
    name: string;

    @Expose()
    title: string;

    @Expose()
    description: string;

    @Expose()
    status: string;

    @Expose()
    @Type(() => PermissionRdo)
    permissions: PermissionRdo[];

}