module.exports = (sequelize, DataTypes) => {
    const staff = sequelize.define('staff', {
        email: DataTypes.STRING,
        fullName: DataTypes.STRING,
        identityCard: DataTypes.STRING,
        password: DataTypes.STRING,
        phoneNumber: DataTypes.STRING,
        role: DataTypes.STRING
    });

    return staff;
}