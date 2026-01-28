import { Expose } from "class-transformer";
import { Gender, UserStatus } from "src/common/constants/app.constant";
import { BaseRdo } from "src/common/rdo/base-response.rdo";


export class UserRdo extends BaseRdo{

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
    birthDate?: Date;

    @Expose()
    status: UserStatus;

    
}