import { Exclude, Expose, Type } from "class-transformer";
import { Gender, UserStatus } from "src/common/constants/app.constant";
import { BaseRdo } from "src/common/rdo/base-response.rdo";
import { UserDetailRdo } from "./user-detail.rdo";
import { OmitType } from "@nestjs/swagger";
import { RoleSummaryRdo } from "src/api/roles/rdo/role-summary.rdo";

@Exclude()
export class UserRdo extends OmitType(UserDetailRdo,['role']) {
    
    @Expose()
    @Type(() => RoleSummaryRdo)
    role: RoleSummaryRdo;
}