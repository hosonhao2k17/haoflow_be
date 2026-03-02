import { Expose } from "class-transformer";


export class BaseRdo {

    @Expose()
    createdAt: Date;

    @Expose()
    updatedAt: Date;

}