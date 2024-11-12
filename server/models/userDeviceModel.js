export default (sequelize, Sequelize) => {
    const UserDevices = sequelize.define("userDevices", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        deviceInfo: {
            type: Sequelize.JSON,
            allowNull: false,
        },
        lastLogin: {
            type: Sequelize.DATE,
            allowNull: true,
        },
    });
    return UserDevices;
};
