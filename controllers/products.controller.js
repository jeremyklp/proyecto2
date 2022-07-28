const {ref, uploadBytes} = require('firebase/storage')
// Models
const { Products } = require('../models/products.model');
const { Categories } = require('../models/categories.model');

// Utils
const { catchAsync } = require('../Utils/catchAsync');
const { AppError } = require('../Utils/app.error');
const {storage}= require('../Utils/firebase.util')


//------------------------------------------------------------------//

const getAllProducts = catchAsync(async (req, res, next) => {
	const product = await Products.findAll({
		where: { status: 'active' },
		include: [
			{ model: Category, attributes: ['name'] },
			{ model: User, attributes: ['username', 'email'] },
		  ],
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
		
	});

	res.status(200).json({
		status: 'success',
		data: { category },
	});
});

//------------------------------------------------------------------//

const getProductById = catchAsync(async (req, res, next) => {
	const { id } = req.params; 

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
	const { sessionUser } = req;
	const { title, description, price, categoryId, quantity } = req.body;

    req.file
	const imgRef = ref(storage, `${Date.now}_${req.file.originalname}`);
	const imgRes = uploadBytes(imgRef, req.file.buffer);


	const newProduct = await Products.create({
		title,
        description,
        price, 
        categoryId,
        quantity,
		userId: sessionUser.id, //revisar
	});

	res.status(200).json({
		status: 'success',
		data: { newProduct },
	});
});

//------------------------------------------------------------------//

const createCategory = catchAsync(async (req, res, next) => {
	const { name } = req.body;

	if (name.length === 0) {
		return next(new AppError('Name cannot be empty', 400));
	  }

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
	const { id } = req.params;
	const { name } = req.body; //solo admin puede hacer esta accion

	const category = await Category.findOne({
		where: { id, status: 'active' },
	  });
	
	  if (!category) {
		return next(new AppError('Category does not exits with given id', 404));
	  }
	
	  if (newName.length === 0) {
		return next(new AppError('The updated name cannot be empty', 400));
	  }  
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
});

const disableProduct = catchAsync(async (req, res, next) => {
	const { id } = req.params;

    const product = await Products.findOne({ where: { id } });

    if (!product) {
		return res.status(404).json({
			status: 'error',
			message: 'User not found',
		});
	}

	await product.update({ status: 'Disable' });

	res.status(204).json({ status: 'success' });
});

//------------------------------------------------------------------//



module.exports = {
	getAllProducts,
    getAllCategory,
    getProductById,
    createProduct,
    createCategory,
    updateCategory,
    ubdateProduct,
	disableProduct
}