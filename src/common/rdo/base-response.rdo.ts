import { Exclude, Expose } from "class-transformer";


export class BaseRdo {

    @Expose()
    createdAt: Date;

    @Expose()
    updatedAt: Date;

    @Expose()
    createdBy: string;

    @Expose()
    updatedBy: string;

}