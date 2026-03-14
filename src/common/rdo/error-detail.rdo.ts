import { Expose } from "class-transformer";
import { ExposeField } from "src/decorators/field.decorator";


export class ErrorDetailRdo {

    @ExposeField()
    property: string;

    @ExposeField()
    code: string;

    @ExposeField()
    message: string;
}