import db from "../../../models/index.js";

const AuditLog = db.auditLog;

export default async function logActivity(
    action,
    targetUserData = null,
    performedByUser = null,
) {
    if (!action) {
        return;
    }

    const performedByUserData = performedByUser
        ? {
              id: performedByUser.id,
              username: performedByUser.username,
              role: performedByUser.role,
              status: performedByUser.status,
          }
        : null;

    await AuditLog.create({
        performedByUserData,
        targetUserData,
        action,
    });
    console.log("log created");
}
