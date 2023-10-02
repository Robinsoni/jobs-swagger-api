
require('dotenv').config();
require('express-async-errors');
const express = require("express");
const app = express();
// extra security packages
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');
//

app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 200, // limit each IP to 100 requests per windowMs
  })
);
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

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