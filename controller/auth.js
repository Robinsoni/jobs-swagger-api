const User = require("../models/Users");
const { StatusCodes } = require('http-status-codes');
console.log("register ** ");
const register = async (req, res) => {
    try {
        const user = await User.create({ ...req.body });
        const token = user.createJWT(); 
        res.status(StatusCodes.CREATED).json({ user:{name:user.name},token });
    } catch (err) {
        res.status(StatusCodes.NOT_FOUND).json({ error:"Error while creating the user, maybe user exists already" });
    }
};
const login = async (req, res) => {
   try{ 
        const {email, password} = req.body;
        if(!email || !password){
            res.status(StatusCodes.NOT_FOUND).json({error:"User does not exists, Please check the credentials"});
        } 
        const user = await User.findOne({email})
        if(!user){ 
            res.status(StatusCodes.NOT_FOUND).json({error:"User not found"});
        }
        /** Verify the user */
        const isFound =   await user.comparePassword(password);
        
       if(isFound){
            const token = user.createJWT();
            res.status(StatusCodes.CREATED).json({user:{name:user.name},token});
        }else{
           res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error:"Password didn't match"}); 
       }
   }catch(err){
        res.status(StatusCodes.NOT_FOUND).json({error:err});
   }
};
module.exports = {
    register, login
}