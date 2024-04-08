module.exports = (sequelize, DataTypes) => {
    const budget = sequelize.define('user', {
        StartDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        EndDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        TotalAmount: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false,
        },
    });

    return User;
