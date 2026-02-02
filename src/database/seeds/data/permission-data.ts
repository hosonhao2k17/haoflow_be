import { PermissionAction, PermissionSubject } from "src/common/constants/app.constant";

export const PERMISSIONS = [
  // ===== USER =====
  { action: PermissionAction.CREATE, subject: PermissionSubject.USER },
  { action: PermissionAction.READ, subject: PermissionSubject.USER },
  { action: PermissionAction.UPDATE, subject: PermissionSubject.USER },
  { action: PermissionAction.DELETE, subject: PermissionSubject.USER },

  // ===== ROLE =====
  { action: PermissionAction.CREATE, subject: PermissionSubject.ROLE },
  { action: PermissionAction.READ, subject: PermissionSubject.ROLE },
  { action: PermissionAction.UPDATE, subject: PermissionSubject.ROLE },
  { action: PermissionAction.DELETE, subject: PermissionSubject.ROLE },

  // ===== TASK =====
  { action: PermissionAction.CREATE, subject: PermissionSubject.TASK },
  { action: PermissionAction.READ, subject: PermissionSubject.TASK },
  { action: PermissionAction.UPDATE, subject: PermissionSubject.TASK },
  { action: PermissionAction.DELETE, subject: PermissionSubject.TASK },
];
