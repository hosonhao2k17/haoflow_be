import { Exclude, Expose, Type } from "class-transformer";
import { BaseResponseRdo } from "src/common/rdo/base-response.rdo";
import { PermissionRdo } from "./permission.rdo";

@Exclude()
export class RoleRdo extends BaseResponseRdo{

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