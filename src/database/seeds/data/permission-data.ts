import { ActionPermission, SubjectPermission, SYSTEM } from "src/common/constants/app.constant";

export const PERMISSIONS = [
  // ===== USER =====
  { action: ActionPermission.CREATE, subject: SubjectPermission.USER, createdBy: SYSTEM },
  { action: ActionPermission.READ, subject: SubjectPermission.USER, createdBy: SYSTEM  },
  { action: ActionPermission.UPDATE, subject: SubjectPermission.USER,createdBy: SYSTEM  },
  { action: ActionPermission.DELETE, subject: SubjectPermission.USER, createdBy: SYSTEM  },

  // ===== ROLE =====
  { action: ActionPermission.CREATE, subject: SubjectPermission.ROLE, createdBy: SYSTEM  },
  { action: ActionPermission.READ, subject: SubjectPermission.ROLE, createdBy: SYSTEM  },
  { action: ActionPermission.UPDATE, subject: SubjectPermission.ROLE, createdBy: SYSTEM  },
  { action: ActionPermission.DELETE, subject: SubjectPermission.ROLE, createdBy: SYSTEM  },

  // ===== TASK =====
  { action: ActionPermission.CREATE, subject: SubjectPermission.TASK, createdBy: SYSTEM  },
  { action: ActionPermission.READ, subject: SubjectPermission.TASK, createdBy: SYSTEM  },
  { action: ActionPermission.UPDATE, subject: SubjectPermission.TASK, createdBy: SYSTEM  },
  { action: ActionPermission.DELETE, subject: SubjectPermission.TASK, createdBy: SYSTEM  },
];
