import { Expose, Type } from "class-transformer";
import { UserRdo } from "src/api/users/rdo/user.rdo";


export class LoginRdo {

    @Expose()
    userId: string;

    @Expose()
    accessToken: string;

    @Expose()
    refreshToken: string;

    @Expose()
    expiresIn: string;

}