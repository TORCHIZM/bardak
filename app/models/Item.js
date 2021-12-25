const { Sequelize, DataTypes } = require('sequelize');

const sequelize = require('../../config/database');

const Session = sequelize.define("items", {
	id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    buyer: DataTypes.INTEGER,
	qrCode: DataTypes.STRING,
    redirectTo: DataTypes.TEXT
});

module.exports = Session;