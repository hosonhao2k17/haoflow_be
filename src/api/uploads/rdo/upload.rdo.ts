import { Exclude } from "class-transformer";
import { ExposeField } from "src/decorators/field.decorator";

@Exclude()
export class UploadRdo {

    @ExposeField()
    publicId: string;

    @ExposeField()
    url: string;
}