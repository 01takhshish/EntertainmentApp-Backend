const mongoose = require("mongoose");
require('dotenv').config();

const databaseConnection = () => {
     mongoose.connect(process.env.MONGO_DATABASE).then(() => {
        console.log("MongoDb connected succefully!")
     }).catch((error) => {
        console.log(error)
     })
}

module.exports = {databaseConnection}