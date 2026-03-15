import { OmitType, PickType } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { ExposeField } from "src/decorators/field.decorator";
import { RoleRdo } from "./role.rdo";

@Exclude()
export class RoleSummaryRdo extends PickType(RoleRdo, ['id','name','title']) {

    @ExposeField()
    totalPermission: number;
}