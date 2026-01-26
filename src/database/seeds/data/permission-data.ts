import { ActionPermission, SubjectPermission } from "src/common/constants/app.constant";

export const PERMISSIONS = [
  // ===== USER =====
  { action: ActionPermission.CREATE, subject: SubjectPermission.USER },
  { action: ActionPermission.READ, subject: SubjectPermission.USER },
  { action: ActionPermission.UPDATE, subject: SubjectPermission.USER },
  { action: ActionPermission.DELETE, subject: SubjectPermission.USER },

  // ===== ROLE =====
  { action: ActionPermission.CREATE, subject: SubjectPermission.ROLE },
  { action: ActionPermission.READ, subject: SubjectPermission.ROLE },
  { action: ActionPermission.UPDATE, subject: SubjectPermission.ROLE },
  { action: ActionPermission.DELETE, subject: SubjectPermission.ROLE },

  // ===== TASK =====
  { action: ActionPermission.CREATE, subject: SubjectPermission.TASK },
  { action: ActionPermission.READ, subject: SubjectPermission.TASK },
  { action: ActionPermission.UPDATE, subject: SubjectPermission.TASK },
  { action: ActionPermission.DELETE, subject: SubjectPermission.TASK },
];
