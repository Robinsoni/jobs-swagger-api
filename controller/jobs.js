const Job = require('../models/Jobs');

const getAllJobs = async(req,res) => {
    const jobs = await Job.find().sort('createdAt');
    res.status(200).json({jobs,count:jobs.length});
}

const createJob = async (req, res,next) => {
    res.send("<h1>Create jobs controller</h1>"); 
}

module.exports = {
    createJob,
    getAllJobs
};