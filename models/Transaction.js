module.exports = (sequelize, DataTypes) => {
    const Transaction = sequelize.define('receipt', {
        Amount: {
            type: DataTypes.Decimal(10,2),
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
        // TODO: add other columns for this table
    });

    return Receipt;
};
