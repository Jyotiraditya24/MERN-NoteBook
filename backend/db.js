const mongoose = require('mongoose');
const mongoURI = "mongodb://127.0.0.1:27017/CrudNoteBook";

const connection = ()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("Connected To MongoDB");
    })
}


module.exports = connection;

