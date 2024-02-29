const StatusCode = require("../utils/constants")
const { jsonGenerate } = require("../utils/helper")
const jwt=require("jsonwebtoken")

const AuthMiddleware=(req,res,next)=>{


    const token=req.headers.authorization;
    if (!token) {
        return res.status(StatusCode.UNAUTHORIZED).json(jsonGenerate(StatusCode.UNAUTHORIZED, 'Access denied. No token provided.'));
    }

    try{
           const decoded=jwt.verify(token,'my-secret-key');
           console.log(decoded);

          // req.user=decoded;
           req.userId=decoded.userId;
           console.log(req.userId);
           return next();
    }catch(error){
       return res.json(jsonGenerate(StatusCode.UNAUTHORIZED,"Invalid Token"))
    }
}

module.exports=AuthMiddleware;