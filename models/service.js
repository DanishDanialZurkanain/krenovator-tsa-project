module.exports = (sequelize, DataTypes) => {
    const service = sequelize.define('service', {
        title: DataTypes.STRING,
        description: DataTypes.STRING
    });

    return service;
}