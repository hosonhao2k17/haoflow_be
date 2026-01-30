import { RoleRdo } from "src/api/roles/rdo/role.rdo";
import { UserRdo } from "./user.rdo";
import { UserRoleRdo } from "./user-role.rdo";
import { Exclude, Expose, Type } from "class-transformer";

@Exclude()
export class CurrentUserRdo extends UserRdo {


    @Expose()
    @Type(() => UserRoleRdo)
    role: UserRoleRdo;
}