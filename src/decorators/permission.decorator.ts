import { SetMetadata } from "@nestjs/common";
import { PermissionAction, PERMISSIONS_ACTION, PERMISSIONS_SUBJECT, PermissionSubject } from "src/common/constants/app.constant";


export const Action = (action: PermissionAction) => SetMetadata(PERMISSIONS_ACTION, action);

export const Subject = (subject: PermissionSubject) => SetMetadata(PERMISSIONS_SUBJECT, subject)