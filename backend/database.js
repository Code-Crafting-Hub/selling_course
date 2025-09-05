require('dotenv').config()
const mongoose = require('mongoose')

const ConnectDb = async ()=>{
    try {
        await mongoose.connect(process.env.DB_URI);
        console.log("Database is connected successfully")
    } catch (error) {
        console.log("Error while connecting database")
    }
    
}

module.exports = ConnectDb