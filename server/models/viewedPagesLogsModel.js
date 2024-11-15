export default (sequelize, Sequelize) => {
    const viewedPagesLogs = sequelize.define(
        "viewedPagesLogs",
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            page: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            viewedBy: {
                type: Sequelize.JSON,
                allowNull: true,
            },
        },
        {
            timestamps: true,
            tableName: "viewed_pages_logs",
        },
    );

    return viewedPagesLogs;
};
