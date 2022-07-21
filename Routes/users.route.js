const express = require('express');

// Controllers
const {
	getAllProducts,
    getAllPurchases,
    getUserOrder,
    createUser,
    updateUser,
    disableUser,
    login
} = require('../controllers/users.controller');



const {protectSession, protectUserAccount}= require('../midlewares/auth.middleware')
const {createUserValidators}= require('../midlewares/validators.middleware')
const {userExists}= require('../midlewares/users.middleware')




const userRouter = express.Router();

userRouter.post('/login', login);

userRouter.post('/', createUserValidators, createUser);


userRouter.use(protectSession)

userRouter.get('/me', getAllProducts); // revisar lo de jwt
userRouter.get('/orders', getAllPurchases);
userRouter.get('/orders/:id', getUserOrder);

userRouter.patch('/:id',userExists, protectUserAccount, updateUser);

userRouter.delete('/:id',userExists, protectUserAccount, disableUser);



module.exports = { userRouter };