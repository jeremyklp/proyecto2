 const { db, DataTypes } = require('../Utils/database.util');


const Users = db.define('user', {
	id: {
		primaryKey: true,
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
	},
	username: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false,
	},
    role: {
		type: DataTypes.STRING,
		allowNull: false,
		defaultValue: 'normal',
	},
	status: {
		type: DataTypes.STRING,
		allowNull: false,
		defaultValue: 'active',
	},
    

});

module.exports = {Users} ;