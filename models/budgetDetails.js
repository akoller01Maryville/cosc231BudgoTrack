module.exports = (sequelize, DataTypes) => {
    const BudgetDetail = sequelize.define('budgetdetail', {
        AllocatedAmount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
    });

    return BudgetDetail;
};
