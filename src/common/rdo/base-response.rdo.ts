import { Exclude, Expose } from "class-transformer";


/**
 * T is id  default uuid type
 */
@Exclude()
export class BaseResponseRdo<T = string> {

    @Expose()
    id: T;

    @Expose()
    createdAt: Date;

    @Expose()
    updatedAt: Date;

}