import { Expose } from "class-transformer";


export class AiRdo<T> {

    @Expose()
    module: string;

    @Expose()
    message: string;

    @Expose()
    summary: string;

    @Expose()
    data: T;
}