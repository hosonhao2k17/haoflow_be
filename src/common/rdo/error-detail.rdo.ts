import { Expose } from "class-transformer";


export class ErrorDetailRdo {

    @Expose()
    property: string;

    @Expose()
    code: string;

    @Expose()
    message: string;
}