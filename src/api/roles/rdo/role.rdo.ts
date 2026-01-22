import { Exclude, Expose } from "class-transformer";
import { BaseResponseRdo } from "src/common/rdo/base-response.rdo";

@Exclude()
export class RoleRdo extends BaseResponseRdo{

    @Expose()
    name: string;

    @Expose()
    title: string;

    @Expose()
    description: string;

}