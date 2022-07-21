const express = require('express');

// Controllers
const {
	AddProduct,
	Purchase,
	updateCart,
	deleteProductCart
} = require('../controllers/carts.controller');



const {protectSession, protectUserAccount}= require('../midlewares/auth.middleware')
const { createUserValidators, createValidatorProduct }= require('../midlewares/validators.middleware')
const {userExists}= require('../midlewares/users.middleware')




const cartRouter = express.Router();

cartRouter.use(protectSession)

cartRouter.post('/add-product', AddProduct);
cartRouter.post('/purchase', createValidatorProduct, createUserValidators, Purchase);//protejerlos

cartRouter.patch('/update-cart',userExists, protectUserAccount, updateCart);


cartRouter.delete('/:productId',userExists, protectUserAccount, deleteProductCart);



module.exports = { cartRouter };