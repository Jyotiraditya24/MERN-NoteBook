const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRECT = "jyotir090909";

// Creates a User using:POST "/api/auth/createUser" . does not require authentication

router.post('/createUser',[
    body('name','Enter a valid name').isLength({min:3}),
    body('email','Enter a valid Email').isEmail(),
    body('password','Enter a valid password').isLength({min:5}),
],async (req,res)=>{
   // checking for errors
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
     return res.status(400).json({ errors: errors.array() });
   }

// creating user in the database with unique email address
   try{
    let user = await User.findOne({email: req.body.email})
   if(user){
    return res.status(400).json({error: "a user with this email already exists"});
   }

   // using bcrypt to create password
   const salt = await bcrypt.genSalt(10);
   const secPassword = await bcrypt.hash(req.body.password,salt);

   // creating user in mongodb
    user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: secPassword
   })

   const data = {
      user:{
         id:user.id,
      }
   }
   const authToken = jwt.sign(data,JWT_SECRECT); //returns token
   res.json({authToken}); // same as {auth : auth }

   }catch(err){
        console.log(err, "error here in try and catch")
        res.status(500).send("Some error occured")
   }

})

module.exports = router;