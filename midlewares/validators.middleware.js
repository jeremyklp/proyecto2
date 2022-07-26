const { body, validationResult } = require('express-validator');

const { AppError } = require('../utils/app.error');

const checkResult = (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		// Array has errors
		const errorMsgs = errors.array().map(err => err.msg);

		const message = errorMsgs.join('. ');

		return next(new AppError(message, 400));
	}

	next();
};

/*const createReviewsAndRestaurant = [
	body('rating').isInt().withMessage('Name cannot be empty'),
	checkResult,
]
*/
const createUserValidators = [
	body('username').notEmpty().withMessage('Name cannot be empty'),
	body('email').isEmail().withMessage('Must provide a valid email'),
	body('password')
		.isLength({ min: 9 })
		.withMessage('Password must be at least 9 characters long')
		.isAlphanumeric()
		.withMessage('Password must contain letters and numbers'),
	checkResult,
];

/*const createMealValidators = [
	body('name').notEmpty().withMessage('Name cannot be empty'),
	body('price')
		.notEmpty()
		.isInt()
		.withMessage('price just can be a integer'),
	checkResult,
];
*/
const createValidatorProduct = [
	body('title').notEmpty().withMessage('Name cannot be empty'),
	body('description')
		.notEmpty()
		.withMessage('descriptions just can be a description to product'),
	body('categoryId:')
	     .notEmpty()
		 .withMessage('you need categiory for continue'),
	checkResult,
]

module.exports = { createUserValidators, createValidatorProduct };
