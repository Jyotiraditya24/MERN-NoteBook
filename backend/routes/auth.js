const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Creates a User using:POST "/api/auth" . does not require authentication

router.post('/',(req,resp)=>{
   console.log(req.body);
   const user = new User(req.body);
   user.save();
   resp.send(user); 
})

module.exports = router;