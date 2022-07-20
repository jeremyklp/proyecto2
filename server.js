const { app } = require('./app');

//Models

//utils
const { db } = require('./Utils/database.util');


const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

// Database authenticated
db
	.authenticate()
	.then(() => console.log('Database authenticated'))
	.catch(err => console.log(err));

//Unit models relations
/*User.hasMany(Orders, {foreignkey: 'UserId'});
Orders.belongsTo(User);

User.hasMany(Reviews, {foreignkey: 'UserId'});
Reviews.belongsTo(User);

Restaurants.hasMany(Reviews, {foreignkey: 'restaurantId' })
Reviews.belongsTo(Restaurants);

Meals.hasOne(Orders, {foreignkey: 'mealId'})
Orders.belongsTo(Meals);*/

//revisar las relaciones

// Database synced with models' relations  
db
	.sync()
	.then(() => console.log('Database synced'))
	.catch(err => console.log(err));

    // Spin up server
const PORT = process.env.DB_PORT  || 4000;
app.listen(PORT, () => {
	console.log(`Express app running on port: ${PORT}`);
});