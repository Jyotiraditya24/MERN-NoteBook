const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017";

const connection = ()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("Connected To MongoDB");
    })
}


module.exports = connection;

