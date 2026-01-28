import { Exclude, Expose } from "class-transformer";


/**
 * T is id  default uuid type
 */
export class BaseRdo<T = string> {

    @Expose()
    createdAt: Date;

    @Expose()
    updatedAt: Date;

    @Expose()
    createdBy: string;

}