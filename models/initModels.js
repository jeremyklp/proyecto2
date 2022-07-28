const {Users} = require('../models/users.model');
const {Orders} = require('../models/orders.model');
const {Products} = require('../models/products.model');
const {Carts} = require('../models/carts.model');
const {Categories} = require('../models/categories.model');
const {ProductsInCart} = require('../models/productsInCart.model');
const {ProductImgs} = require('../models/productImgs.model');

const initModels = () => {
//Unit models relations
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
};

module.exports = { initModels };