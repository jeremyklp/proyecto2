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
	const { cardId } = req;

	const purchase = await ProductsInCart.update({
        cardId,
	});

	const cartPurchases = await Carts.findAll({
		where: { status: 'active' }
		
	});

	res.status(200).json({
		status: 'success',
		data: { purchase },
	});
});

//-------------------------------------------------------------------//

const updateCart = catchAsync(async (req, res, next) => {
	const { productsInCart } = req;
	const { productId,quantity } = req.body;

	await productsInCart.update({ productId,quantity });

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