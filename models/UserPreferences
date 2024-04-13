module.exports = (sequelize, DataTypes) => {
    const UserPreferences = sequelize.define('receipt', {
        EnablePushNotifications: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },

        PrivateAccount: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        // TODO: add other columns for this table
    });

    return UserPreferences;
};
