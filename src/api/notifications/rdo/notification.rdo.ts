import { Exclude, Expose } from "class-transformer";
import { BaseRdo } from "src/common/rdo/base-response.rdo";
import { ExposeField } from "src/decorators/field.decorator";

@Exclude()
export class NotificationRdo extends BaseRdo {

    @ExposeField()
    id: string;

    @ExposeField()
    title: string;

    @ExposeField()
    body: string;

    @ExposeField()
    metaData: Record<string, any>;

    @ExposeField()
    isRead: boolean;

    @ExposeField()
    readAt: Date;
}