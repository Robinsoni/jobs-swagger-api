const { StatusCodes } = require('http-status-codes');
const Job = require('../models/Jobs');
const User = require('../models/Users');
const getAllJobs = async (req, res) => { 
    const jobs = await Job.find({ createdBy: req.user.userId }).sort('createdAt');
    res.status(200).json({ jobs, count: jobs.length });
}
const getJob = async (req, res) => {
    try {

        const job = await Job.find({ _id: req.params.id, createdBy: req.user.userId }   )
        if (!job) {
            res.status(StatusCodes.NOT_FOUND).json({ error: `No job with id ${req.params.id}` });
        }
        res.status(StatusCodes.OK).json({ job });
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
    }
}
const createJob = async (req, res, next) => {
    try {
        const request = { ...req.body, createdBy: req.user.userId };
        const job_created = await Job.create(request);
        res.status(StatusCodes.CREATED).json({ success: "Record inserted successfully", result: job_created });
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
    }
}

const updateJob = async (req, res, next) => {
    try {

        const job = await Job.findOneAndUpdate({ _id: req.params.id, createdBy: req.user.userId }, req.body, { new: true, runValidators: true })
        if (!job) {
            res.status(StatusCodes.NOT_FOUND).json({ error: `No job with id ${req.params.id}` });
        }
        res.status(StatusCodes.OK).json({ success: job });
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
    }
}
const deleteJob = async (req, res, next) => {
    try {
        const job = await Job.findOneAndDelete({ _id: req.params.id, createdBy: req.user.userId })
        if (!job) {
            res.status(StatusCodes.NOT_FOUND).json({ error: `No job with id ${req.params.id}` });
        }

        res.status(StatusCodes.OK).json({ success: job });
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
    }

}

module.exports = {
    createJob,
    updateJob,
    getAllJobs,
    deleteJob,
    getJob,
};