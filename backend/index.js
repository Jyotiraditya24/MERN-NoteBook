const express = require('express');
const app = express();
const connectToMongo = require('./db');
const port = 8000

connectToMongo();

app.use(express.json());

// Available Routes
app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'))


app.listen(8000,()=>{
    console.log(`listening on port ${port}`);
})



