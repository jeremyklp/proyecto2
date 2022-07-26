const express = require('express');

const {globalErrorHandler} = require('./controllers/error.controller');
const helmet = require('helmet')
const {AppError} = require('./Utils/app.error');
const compression =require('compression')
const morgan = require('morgan')

const app = express();

// routes
const {userRouter} = require('./Routes/users.route')
const {productRouter} = require('./Routes/products.route')
const {cartRouter} = require('./Routes/cart.routes')

// Enable incoming JSON data
if (process.env.NODE_ENV==="develoment"){app.use(morgan('dev'))}
else{app.use(morgan('combined'))}

app.use(express.json());
app.use(compression());
app.use(helmet());
//Endpoints

app.use('/api/v1/products',productRouter);
app.use('/api/v1/cart',cartRouter);
app.use('/api/v1/users',userRouter);



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