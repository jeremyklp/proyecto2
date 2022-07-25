const express = require('express');
const helmet = require('helmet')
const compression = require('compresion');


//Routes
const {cartRouter}= require('./Routes/cart.routes');
const {productRouter}= require('./Routes/products.route');
const {userRouter}= require('./Routes/users.route');

//GLOBAL ERROR
const {globalErrorHandler} = require('./controllers/error.controller');

//utils
const {AppError} = require('./Utils/app.error');

//Init express app
const app = express();

// Enable incoming JSON data
app.use(express.json());


//Endpoints
app.use('/api/v1/users',userRouter);
app.use('/api/v1/products',productRouter);
app.use('/api/v1/cart',cartRouter);


//Add security headers
app.use(helmet());

//compress response
app.use(compression());

//log incoming requests
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));
else app.use(morgan('combined'));

app.use('/');

app.all('*', (req, res, next) => {
    next(
        new AppError(
            `${req.method} ${req.originalUrl} not found in this server`,
            404
        )
    );
});

app.use(globalErrorHandler);


module.exports = { app };