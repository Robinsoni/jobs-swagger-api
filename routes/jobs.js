const express  = require("express"); 
const router  = express.Router();
const {createJob,getAllJobs} = require("../controller/jobs");
router.route("/").post(createJob).get(getAllJobs);

module.exports = router;