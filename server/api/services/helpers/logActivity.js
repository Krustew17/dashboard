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

    if (!performedByUser) {
        await AuditLog.create({
            performedByUserData: null,
            targetUserData: targetUserData,
            action,
        });
        return;
    }

    const performedByUserData = {
        id: performedByUser.id,
        username: performedByUser.username,
        role: performedByUser.role,
        status: performedByUser.status,
    };

    await AuditLog.create({
        performedByUserData,
        targetUserData,
        action,
    });
    console.log("log created");
}
