const { app } = require('./app');

//Models
const {Users} = require('./models/users.model');
const {Orders} = require('./models/orders.model');
const {Products} = require('./models/products.model');
const {Carts} = require('./models/carts.model');
const {Categories} = require('./models/categories.model');
const {ProductsInCart} = require('./models/productsInCart.model');
const {ProductImgs} = require('./models/productImgs.model');
//utils
const { db } = require('./Utils/database.util');


const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

// Database authenticated
db
	.authenticate()
	.then(() => console.log('Database authenticated'))
	.catch(err => console.log(err));

//Unit models relations
Users.hasMany(Orders, {foreignkey: 'userId'});
Orders.belongsTo(Users);

Users.hasOne(Orders, {foreignkey: 'carId'});
Orders.belongsTo(Users);

Users.hasMany(Products, {foreignkey: 'userId'});
Products.belongsTo(Users);

Users.hasOne(Carts, {foreignkey: 'userId'});
Carts.belongsTo(Users);

Orders.cartId.hasOne(Carts, {foreignkey: 'id'});
Carts.belongsTo(Orders);

Products.categoryId.hasOne(Categories, {foreignkey: 'id'});
Categories.belongsTo(Products);

Products.hasMany(ProductImgs, {foreignkey: 'productId'});
ProductImgs.belongsTo(Products);

Products.hasOne(ProductsInCart, {foreignkey: 'productId'});
ProductsInCart.belongsTo(Products);

Carts.hasMany(ProductsInCart, {foreignkey: 'cartId'});
ProductsInCart.belongsTo(Carts);
//revisar las relaciones

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