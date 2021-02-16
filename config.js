const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    port: process.env.PORT,
    dbUsername: process.env.DB_USERNAME,
    dbPassword: process.env.DB_PASSWORD,
    dbName: process.env.DB_NAME,
    mongoDbUri: `mongodb+srv://${process.env.DB_USERNAME}:${encodeURIComponent(process.env.DB_PASSWORD)}@cluster0.2symf.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    secretKey: process.env.SECRET_KEY
};