export default (sequelize, Sequelize) => {
    const AuditLog = sequelize.define(
        "auditLog",
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            targetUserData: {
                type: Sequelize.JSON,
                allowNull: false,
            },
            performedByUserData: {
                type: Sequelize.JSON,
                allowNull: true,
            },
            action: {
                type: Sequelize.STRING,
                allowNull: false,
            },
        },
        {
            timestamps: true,
            tableName: "audit_logs",
        },
    );

    return AuditLog;
};
