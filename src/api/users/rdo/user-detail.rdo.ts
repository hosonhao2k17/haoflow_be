import { Expose } from "class-transformer";
import { UserRdo } from "./user.rdo";
import { Gender, UserStatus } from "src/common/constants/app.constant";
import { BaseRdo } from "src/common/rdo/base-response.rdo";
import { RoleRdo } from "src/api/roles/rdo/role.rdo";


export class UserDetailRdo extends BaseRdo {
    @Expose()
    id: string;

    @Expose()
    fullName: string;

    @Expose()
    email: string;

    @Expose()
    avatar?: string;

    @Expose()
    gender?: Gender;

    @Expose()
    verified: boolean;

    @Expose()
    birthDate?: Date;

    @Expose()
    status: UserStatus;

    @Expose()
    role: RoleRdo;
}