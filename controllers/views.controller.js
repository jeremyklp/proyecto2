const path = require('path');

// Models
//const { Post } = require('../models/post.model');

// Utils
const { catchAsync } = require('../utils/catchAsync.util');

const renderIndex = catchAsync(async (req, res, next) => {
	//const posts = await Post.findAll();

	res.status(200).render('index', {
		title: 'Rendered with Pug'
		
	});


});

module.exports = { renderIndex };
