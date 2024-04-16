module.exports = (sequelize, DataTypes) => {
    const UserPreferences = sequelize.define('userpreferences', {
        EnablePushNotifications: {
            type: DataTypes.BOOL,
            allowNull: false,
        },

        PrivateAccount: {
            type: DataTypes.BOOL,
            allowNull: false,
        },
        // TODO: add other columns for this table
    });

    return UserPreferences;
};
