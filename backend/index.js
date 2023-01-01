const express = require('express');
const app = express();
const connectToMongo = require('./db');
const port = 8000

connectToMongo();

app.get('/',(req,resp)=>{
    resp.send("hello world");
})

app.listen(8000,()=>{
    console.log(`listening on port ${port}`);
})



