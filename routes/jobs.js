const express  = require("express"); 
const router  = express.Router();
const {createJob,getAllJobs, updateJob, deleteJob, getJob} = require("../controller/jobs");
router.route("/").post(createJob).get(getAllJobs);
router.route("/:id").patch(updateJob).delete(deleteJob).get(getJob);

module.exports = router;