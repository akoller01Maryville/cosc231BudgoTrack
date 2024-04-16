module.exports = (sequelize, DataTypes) => {
    const Transaction = sequelize.define('transaction', {
        Amount: {
            type: DataTypes.DECIMAL(10,2),
            unique: false,
            allowNull: false,
        },

        Description: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        TransactionDate: {
            type: DataTypes.DATE,
            unique: false,
            allowNull: false,
        },
    });

    return Transaction;
};
