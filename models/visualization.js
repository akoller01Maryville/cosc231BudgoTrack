module.exports = (sequelize, DataTypes) => {
    const Visualization = sequelize.define('receipt', {
        Type: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        Data: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // TODO: add other columns for this table
    });

    return Visualization;
};
