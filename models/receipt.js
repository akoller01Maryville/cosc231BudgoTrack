// sequelize's way of creating a database table I think>
module.exports = (sequelize, DataTypes) => {
    const Receipt = sequelize.define('receipt', {
        PurchaseDate: {
            type: DataTypes.DATE,
            unique: false,
            allowNull: false,
        },

        TotalAmount: {
            type: DataTypes.DECIMAL(10,2),
            unique: false,
            allowNull: false,
        },

        StoreName: {
            type: DataTypes.STRING,
            unique: false,
            allowNull: false,
        },
        // TODO: add other columns for this table
    });

    return Receipt;
};
