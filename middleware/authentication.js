const { StatusCodes } = require("http-status-codes");
const jwt = require('jsonwebtoken')
const User  = require("../models/Users"); 
const auth = async(req,res,next) => {
    try{ 
        if(!req.headers.authorization || !req.headers.authorization.startsWith("Bearer")){
            res.status(StatusCodes.FORBIDDEN).json({error:"Invalid token"});
        }else{
            const token = req.headers.authorization.split(" ")[1].trim();
            /** Now verify the token */
            const payload = jwt.verify(token, process.env.JWT_SECRET)
            // attach the user to the job routes 
            req.user = { userId: payload.userId, name: payload.name }
            next()
        } 
    }catch(error){ 
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error:error.message});
    }
}
  
module.exports = auth;                             