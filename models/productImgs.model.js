const { db, DataTypes } = require('../Utils/database.util');


const ProductImgs = db.define('productImg', {
	id: {
		primaryKey: true,
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
	},
    imgUrl: {
		type: DataTypes.STRING,
		allowNull: false,
	},
    productId: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	status: {
		type: DataTypes.STRING,
		allowNull: false,
		defaultValue: 'active',
	}
});

module.exports = { ProductImgs };