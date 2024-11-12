import db from "../../../models/index.js";

const AuditLog = db.auditLog;

export default async function logActivity(
    targetUserData,
    action,
    performedByUser = null,
) {
    if (!targetUserData || !action) {
        return;
    }

    if (!performedByUser) {
        console.log("hee");
        await AuditLog.create({
            performedByUserId: null,
            targetUserData: targetUserData,
            action,
        });
        return;
    }

    const performedByUserData = {
        id: performedByUser.user.id,
        username: performedByUser.user.username,
        role: performedByUser.user.role,
        status: performedByUser.user.status,
    };

    await AuditLog.create({
        performedByUserData,
        targetUserData,
        action,
    });
    console.log("log created");
}
