const express  = require("express"); 
const router  = express.Router();
const {createJob} = require("../controller/jobs");
router.route("/").get(createJob);

module.exports = router;