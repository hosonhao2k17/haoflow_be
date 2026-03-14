import { ExposeField } from "src/decorators/field.decorator";


export class BaseRdo {

    @ExposeField()
    createdAt: Date;

    @ExposeField()
    updatedAt: Date;

}