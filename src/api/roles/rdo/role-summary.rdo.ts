import { OmitType, PickType } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";
import { RoleRdo } from "./role.rdo";


@Exclude()
export class RoleSummaryRdo extends PickType(RoleRdo, ['id','name','title']) {

    @Expose()
    totalPermission: number;
}