const express = require('express');
const {upload} = require('../Utils/upload')

// Controllers
const {
	getAllProducts,
    getAllCategory,
    getProductById,
    createProduct,
    createCategory,
    updateCategory,
    ubdateProduct,
    disableProduct
} = require('../controllers/products.controller');



const {protectSession, protectUserAccount}= require('../midlewares/auth.middleware')
const { createUserValidators, createValidatorProduct }= require('../midlewares/validators.middleware')
const {userExists}= require('../midlewares/users.middleware')




const productRouter = express.Router();

productRouter.use(protectSession)

productRouter.post('/categories', createCategory);//protejerlos
productRouter.post('/', createValidatorProduct, createUserValidators, (upload.array(imgUrl), createProduct));//protejerlos

productRouter.get('/', getAllProducts); 
productRouter.get('/:id', getProductById);
productRouter.get('/categories', getAllCategory);

productRouter.patch('/:id',userExists, protectUserAccount, ubdateProduct);
productRouter.patch('/categories/:id',userExists, protectUserAccount, updateCategory);

productRouter.delete('/:id',userExists, protectUserAccount, disableProduct);



module.exports = { productRouter };