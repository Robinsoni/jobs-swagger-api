const createJob = async (req, res,next) => {
    res.send("<h1>Create jobs controller</h1>");
    next();
     
}

module.exports = {
    createJob
};