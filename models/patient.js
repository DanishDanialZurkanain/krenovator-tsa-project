module.exports = (sequelize, DataTypes) => {
    const patient = sequelize.define('patient', {
        email: DataTypes.STRING,
        fullName: DataTypes.STRING,
        identityCard: DataTypes.STRING,
        password: DataTypes.STRING,
        phoneNumber: DataTypes.STRING
    });

    return patient;
}