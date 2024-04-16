module.exports = (sequelize, DataTypes) => {
    const budgetdetail = sequelize.define('user', {
        AllocatedAmount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
    });

    return budgetdetail;
};
