module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        pushNotifications: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        }
    });

    return User;
};
