
require('dotenv').config();
const express = require("express");
const app = express();
const port  = process.env.PORT || 5000;
const start = async() =>{
    try{
        app.listen(port,() => {
            console.log(`Server is listening on port ${port}`);
        });
    }catch(err){
        console.log(err);
    }
};
start();