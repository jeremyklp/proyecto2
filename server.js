const { app } = require('./app');

const { initModels } = require('./models/initModels')

//Models

//utils
const { db } = require('./Utils/database.util');


const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
//Relations 
initModels();
// Database authenticated
db
	.authenticate()
	.then(() => console.log('Database authenticated'))
	.catch(err => console.log(err));


<<<<<<< HEAD
Users.hasOne(Orders, {foreignkey: 'carId'});
Orders.belongsTo(Users);

Users.hasMany(Products, {foreignkey: 'userId'});
Products.belongsTo(Users);

Users.hasOne(Carts, {foreignkey: 'userId'});
Carts.belongsTo(Users);

Orders.hasOne(Carts, {foreignkey: 'id'});
Carts.belongsTo(Orders);

Products.hasOne(Categories, {foreignkey: 'id'});
Categories.belongsTo(Products);

Products.hasMany(ProductImgs, {foreignkey: 'productId'});
ProductImgs.belongsTo(Products);

Products.hasOne(ProductsInCart, {foreignkey: 'productId'});
ProductsInCart.belongsTo(Products);

Carts.hasMany(ProductsInCart, {foreignkey: 'cartId'});
ProductsInCart.belongsTo(Carts);
//revisar las relaciones
=======
>>>>>>> jorge

// Database synced with models' relations  
db
	.sync()
	.then(() => console.log('Database synced'))
	.catch(err => console.log(err));

    // Spin up server
const PORT = process.env.DB_PORT  || 4000;
app.listen(PORT, () => {
	console.log(`Express app running on port: ${PORT}`);
});