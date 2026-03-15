import { ErrorDetailRdo } from "./error-detail.rdo";
import { ExposeField } from "src/decorators/field.decorator";


export class ErrorRdo {

    @ExposeField()
    message: string;

    @ExposeField()
    statusCode: number;

    @ExposeField()
    error: string;
    
    @ExposeField()
    errorCode: string;

    @ExposeField()
    timestamp: string;

    @ExposeField({
        classType: () => ErrorDetailRdo
    })
    details?: ErrorDetailRdo[];


}