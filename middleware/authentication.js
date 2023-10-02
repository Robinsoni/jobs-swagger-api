/* const User  = require("../models/Users"); */
console.log("le's authorize the user");
const auth = async(req,res,next) => {
    console.log("authentication middleware.",req.headers);
    next();
}
  
module.exports = auth;                             