module.exports = (sequelize, DataTypes) => {
    const Budget = sequelize.define('budget', {
        StartDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        EndDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        TotalAmount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
    });

    return Budget;
};