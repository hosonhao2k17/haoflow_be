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

  // ===== AI =====
  { action: PermissionAction.CREATE, subject: PermissionSubject.AI },
  { action: PermissionAction.READ, subject: PermissionSubject.AI },
  { action: PermissionAction.UPDATE, subject: PermissionSubject.AI },
  { action: PermissionAction.DELETE, subject: PermissionSubject.AI },
];
