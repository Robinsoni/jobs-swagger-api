
require('dotenv').config();
require('express-async-errors');
const express = require("express");
const app = express();
app.use(express.json());
const jobsRouter =  require("./routes/jobs");
const connectDB = require("./db/connect")
const authRouter = require("./routes/auth");
const authentication = require("./middleware/authentication");
app.use("/api/v1/auth",authRouter);
app.use("/api/v1/jobs",authentication,jobsRouter);
const port  = process.env.PORT || 5000; 
const start = async() =>{
    await connectDB(process.env.MONGO_URI);
    try{
        app.listen(port,() => {
            console.log(`Server is listening on port {port}`);
        });
    }catch(err){
        console.log(err);
    }
};
start();