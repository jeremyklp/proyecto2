// Models
const { Carts } = require('../models/carts.model');
const { ProductsInCart } = require('../models/productsInCart.model');

// Utils
const { catchAsync } = require('../Utils/catchAsync');
const { AppError } = require('../Utils/app.error');



//-------------------------------------------------------------------//

const AddProduct = catchAsync(async (req, res, next) => {
	const { productId, quantity } = req.body;

	const newAdd = await ProductsInCart.create({
		
        productId,
         quantity
		
	});

	res.status(200).json({
		status: 'success',
		data: { newAdd },
	});
});

//-------------------------------------------------------------------//
//revisar


const Purchase = catchAsync(async (req, res, next) => {
	const { name } = req.body;

	const purchase = await Carts.create({
        name
	});

	res.status(200).json({
		status: 'success',
		data: { purchase },
	});
});

//-------------------------------------------------------------------//

const updateMeal = catchAsync(async (req, res, next) => {
	const { meal } = req;
	const { name, price, } = req.body;

	await meal.update({ name, price });

	res.status(204).json({ status: 'success' });
});

//-------------------------------------------------------------------//

const deleteMeal = catchAsync(async (req, res, next) => {
	const { meal } = req;

	await meal.update({ status: 'deleted' });

	res.status(204).json({ status: 'success' });
});

//-------------------------------------------------------------------//

module.exports = {

}