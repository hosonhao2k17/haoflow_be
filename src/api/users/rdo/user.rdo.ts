import { Exclude, Type } from "class-transformer";
import { ExposeField } from "src/decorators/field.decorator";
import { UserDetailRdo } from "./user-detail.rdo";
import { OmitType } from "@nestjs/swagger";
import { RoleSummaryRdo } from "src/api/roles/rdo/role-summary.rdo";

@Exclude()
export class UserRdo extends OmitType(UserDetailRdo,['role']) {

    @ExposeField()
    @Type(() => RoleSummaryRdo)
    role: RoleSummaryRdo;
}