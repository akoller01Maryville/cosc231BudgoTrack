module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('user', {
        name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        Description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    return User;
