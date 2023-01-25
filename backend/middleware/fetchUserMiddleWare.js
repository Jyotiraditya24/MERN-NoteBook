const jwt = require('jsonwebtoken');
const JWT_SECRECT = "jyotir090909";

const fetchUserMiddleWare = (req,res,next)=>{
    // get the user from jwt token and add id to req
    const token = req.header('auth-token'); 
    try{
    if (!token){
        res.status(401).send({error: "please authenticate using a valid token"});
    }

    //   jwt.verify()
      const data = jwt.verify(token, JWT_SECRECT); //{ user: { id: '63c05be3e401ae106a690667' }, iat: 1673550819 }
      req.user = data.user;
      next();
    } catch (error) {
        res.status(401).send({error: "please authenticate using a valid token"});
    }
}

    

module.exports = fetchUserMiddleWare;