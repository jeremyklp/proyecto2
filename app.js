const express = require('express');

const {globalErrorHandler} = require('./controllers/error.controller');

const {AppError} = require('./Utils/app.error');

const app = express();

// Enable incoming JSON data
app.use(express.json());


//Endpoints
/*
app.use('/api/v1/restaurants',restaurantRouter);
app.use('/api/v1/meals',mealRoute);
app.use('/api/v1/orders',orderRoute);
app.use('/api/v1/users',userRouter);
*/
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