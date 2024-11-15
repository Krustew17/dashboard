import rolesPermissions from "../../config/permissions.js";

export default function checkPermissions(requiredPermissions) {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).send("Unauthorized");
        }

        const userPermissions = rolesPermissions[req.user.role] || [];

        const hasPermission = requiredPermissions.every((perm) =>
            userPermissions.includes(perm),
        );

        if (!hasPermission) {
            return res
                .status(403)
                .json({ message: "Forbidden: Insufficient permissions" });
        }
        next();
    };
}
