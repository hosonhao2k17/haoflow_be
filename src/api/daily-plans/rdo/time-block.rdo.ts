import { Exclude, Expose } from "class-transformer";

@Exclude()
export class TimeBlockRdo {

    @Expose()
    startTime: Date;

    @Expose()
    endTime: Date;
}