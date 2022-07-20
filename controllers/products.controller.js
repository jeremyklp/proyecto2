// Models
const { Products } = require('../models/products.model');
const { Categories } = require('../models/categories.model');

// Utils
const { catchAsync } = require('../Utils/catchAsync');
const { AppError } = require('../Utils/app.error');


//------------------------------------------------------------------//

const getAllProducts = catchAsync(async (req, res, next) => {
	const product = await Products.findAll({
		where: { status: 'active' },
		//include: [{ model: Restaurants }], //revisar que modelo debe ir
	});

	res.status(200).json({
		status: 'success',
		data: { product },
	});
});

//------------------------------------------------------------------//

const getAllCategory = catchAsync(async (req, res, next) => {
	const category = await Categories.findAll({
		where: { status: 'active' },
		//include: [{ model: Restaurants }], //revisar que modelo debe ir
	});

	res.status(200).json({
		status: 'success',
		data: { category },
	});
});

//------------------------------------------------------------------//

const getProductById = catchAsync(async (req, res, next) => {
	const { id } = req.params; // traer restautante por activo

	const product = await Products.findOne({ where: { id } });

	if (!product) {
		return res.status(404).json({
			status: 'product not found',
		});
	}

	res.status(200).json({
		status: 'success',
		product,
	});
});

//------------------------------------------------------------------//

const createProduct = catchAsync(async (req, res, next) => {
	const { title, description, price, categoryId, quantity } = req.body;

	const newProduct = await Products.create({
		title,
        description,
        price, 
        categoryId,
        quantity 
	});

	res.status(200).json({
		status: 'success',
		data: { newProduct },
	});
});

//------------------------------------------------------------------//

const createCategory = catchAsync(async (req, res, next) => {
	const { name } = req.body;

	const newCategory = await Categories.create({
		name
	});

	res.status(200).json({
		status: 'success',
		data: { newCategory },
	});
});

//------------------------------------------------------------------//

const updateCategory = catchAsync(async (req, res, next) => {
	const { category } = req;
	const { name} = req.body; //solo admin puede gacer esta accion

	await category.update({ name });

	res.status(204).json({ status: 'success' });
});

//------------------------------------------------------------------//

const ubdateProduct = catchAsync(async(req, res, next)=>{
	const { title, description, price, quantity } = req.body;
 
	await Products.update({
		title,
        description,
        price, 
        quantity
	});

	res.status(200).json({
		status: 'success',
	});
})

//------------------------------------------------------------------//



module.exports = {
	getAllProducts,
    getAllCategory,
    getProductById,
    createProduct,
    createCategory,
    updateCategory,
    ubdateProduct
}