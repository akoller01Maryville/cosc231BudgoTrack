module.exports = (sequelize, DataTypes) => {
    const UserProfile = sequelize.define('userprofile', {
        FirstName: {
            type: DataTypes.STRING,
        },

        LastName: {
            type: DataTypes.STRING,
        },

        DateOfBirth: {
            type: DataTypes.DATE,
        },
    });

    return UserProfile;
};
