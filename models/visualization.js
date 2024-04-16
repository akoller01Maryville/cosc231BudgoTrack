module.exports = (sequelize, DataTypes) => {
    const Visualization = sequelize.define('visualization', {
        Type: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        Data: {
            type: DataTypes.STRING,
            allowNull: false,
        },

    });

    return Visualization;
};
