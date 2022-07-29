const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
// Models
const { Users } = require('../models/users.model');
const { Orders } = require('../models/orders.model');
const { Products } = require('../models/products.model');
const { ProductImgs } = require('../models/productImgs.model');

// Utils
const { catchAsync } = require('../Utils/catchAsync');
const { AppError } = require('../Utils/app.error');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });



//----------------------------------------------------------//

const getAllProducts = catchAsync(async (req, res, next) => {
	const users = await Users.findAll({
		where: { status: 'active' }
		
	});
// taer el modelo que el usuario a creado del modelo product traer el userId
	res.status(200).json({
		status: 'success',
		data: { users },
	});
});

//----------------------------------------------------------//

const getAllPurchases = catchAsync(async (req, res, next) => {
	const users = await Users.findAll({
		where: { status: 'active' }
		
	});
//hacer relaciones con el include
	res.status(200).json({
		status: 'success',
		data: { users },
	});
});

//----------------------------------------------------------//

const getUserOrder = catchAsync(async (req, res, next) => {
	const { id } = req.params;

	const orderUser = await Users.findOne({ where: { id } });

	if (!orderUser) {
		return res.status(404).json({
			status: 'User not found',
		});
	}

	res.status(200).json({
		status: 'success',
		orderUser,
	});
});

//----------------------------------------------------------//

const createUser = catchAsync(async (req, res, next) => {
	const {  email, password } = req.body;

	const newUser = await Users.create({
		
		email,
        password
		
	});
	await new Email(email).sendWelcome();


	res.status(200).json({
		status: 'success',
		data: { newUser },
	});
});

//----------------------------------------------------------//

const updateUser = catchAsync(async (req, res, next) => {
	const { user } = req;
	const { username, email } = req.body;

	await user.update({ username, email });

	res.status(204).json({ status: 'success' });
});

//----------------------------------------------------------//

const disableUser = catchAsync(async (req, res, next) => {
	const { id } = req.params;

    const user = await Users.findOne({ where: { id } });

    if (!user) {
		return res.status(404).json({
			status: 'error',
			message: 'User not found',
		});
	}

	await user.update({ status: 'Disable' });

	res.status(204).json({ status: 'success' });
});

//----------------------------------------------------------//

const login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    // Validate credentials (email)
    const user = await Users.findOne({
        where: {
            email,
            status: 'active',
        },
    });

    if (!user) {
        return next(new AppError('Credentials invalid', 400));
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return next(new AppError('Credentials invalid', 400));
    }

    // Generate JWT (JsonWebToken) ->
    const token = await jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: '30m',
    });

    // Send response
    res.status(200).json({
        status: 'success',
        token,
    });
});

//----------------------------------------------------------//


module.exports = {
    getAllProducts,
    getAllPurchases,
    getUserOrder,
    createUser,
    updateUser,
    disableUser,
    login
	
}