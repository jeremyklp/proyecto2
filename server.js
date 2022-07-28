const { app } = require('./app');

const { initModels } = require('./models/initModels')

//Models

//utils
const { db } = require('./Utils/database.util');


const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
//Relations 
initModels();
// Database authenticated
db
    .authenticate()
    .then(() => console.log('Database authenticated'))
    .catch(err => console.log(err));

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