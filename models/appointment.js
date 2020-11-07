module.exports = (sequelize, DataTypes) => {
    const appointment = sequelize.define('appointment', {
        date: DataTypes.DATEONLY,
        time: DataTypes.TIME,
        patientId: DataTypes.INTEGER,
        serviceId: DataTypes.INTEGER,
        status: DataTypes.STRING,
    });

    return appointment;
}