const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchUserMiddleWare = require('../middleware/fetchUserMiddleWare');

const JWT_SECRECT = "jyotir090909";

// ROUTE1: Creates a User using:POST "/api/auth/createUser" . does not require authentication

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
        res.status(500).send("Internal Server Error");
   }

})


// ROUTE2: authenticate a user
   router.post('/login',[
      body('email','Enter a valid email').isEmail(),
      body('password','Password cannot be empty').exists(),
   ],async(req,res)=>{
      let errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
        const{email,password} = req.body;
        try {
          let user = await User.findOne({ email: email });
          if (!user) {
            return res
              .status(400)
              .json({
                errors: "Please try to enter using correct credentials",
              });
          }

          const passwordCompare = await bcrypt.compare(password, user.password);
          if (!passwordCompare) {
            return res.status(400).json({
              errors: "Please try to enter using correct credentials",
            });
          }

          const payload = {
            user: {
              id: user.id,
            },
          };
          const authToken = jwt.sign(payload, JWT_SECRECT); //returns token
          res.json({ authToken }); // same as {auth : auth }

        } catch (err) {
          console.log(err, "error here in try and catch");
          res.status(500).send("Internal Server Error");
        }
   })

   // ROUTE3 : Get logged in User , Login Required
   router.post("/getUser", fetchUserMiddleWare , async (req, res) => {
     try {
       const userId = req.user.id;
       const user = await User.findById(userId).select("-password");
       res.send(user);
     } catch (err) {
       console.log(err, "error here in try and catch");
       res.status(500).send("Internal Server Error");
     }
   });
  

module.exports = router;