export default (sequelize, Sequelize) => {
    const Document = sequelize.define(
        "document",
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            title: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            updatedBy: {
                type: Sequelize.JSON,
                allowNull: false,
            },
            status: {
                type: Sequelize.STRING,
                allowNull: true,
            },
        },
        {
            timestamps: true,
            tableName: "document",
        },
    );

    return Document;
};
