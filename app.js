
require('dotenv').config();
const express = require("express");
const app = express();
const jobsRouter =  require("./routes/jobs");
const connectDB = require("./db/connect")
app.get("/",jobsRouter);
const port  = process.env.PORT || 5000; 
const start = async() =>{
    await connectDB(process.env.MONGO_URI);
    try{
        app.listen(port,() => {
            console.log(`Server is listening on port ${port}`);
        });
    }catch(err){
        console.log(err);
    }
};
start();