//Connecting to the cloud mongodb server

const mongoose = require('mongoose')

 const connectDB= (url)=>{
    return mongoose.connect(url)
 }

 module.exports = connectDB
