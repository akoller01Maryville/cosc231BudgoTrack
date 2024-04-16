module.exports = (sequelize, DataTypes) => {
    const Analysis = sequelize.define('analysis', {
        AnalysisDate: {
            type: DataTypes.DATE,
            unique: false,
            allowNull: false,
        },

        Summary: {
            type: DataTypes.STRING,
        },
        // TODO: add other columns for this table
    });

    return Analysis;
};
