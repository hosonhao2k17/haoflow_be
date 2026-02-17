import { Exclude, Expose } from "class-transformer";

@Exclude()
export class UploadRdo {

    @Expose()
    publicId: string;

    @Expose()
    url: string;
}