import { Exclude } from "class-transformer";
import { ExposeField } from "src/decorators/field.decorator";
import { Gender, UserStatus } from "src/common/constants/app.constant";
import { BaseRdo } from "src/common/rdo/base-response.rdo";
import { RoleRdo } from "src/api/roles/rdo/role.rdo";

@Exclude()
export class UserDetailRdo extends BaseRdo {
    @ExposeField()
    id: string;

    @ExposeField()
    fullName: string;

    @ExposeField()
    email: string;

    @ExposeField()
    avatar?: string;

    @ExposeField()
    gender?: Gender;

    @ExposeField()
    verified: boolean;

    @ExposeField()
    birthDate?: Date;

    @ExposeField()
    status: UserStatus;

    @ExposeField()
    role: RoleRdo;
}