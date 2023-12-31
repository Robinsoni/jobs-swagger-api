
const express = require("express");
const router = express.Router();

/* create the router. */
const {register, login}  = require("../controller/auth");
router.post('/register', register)
router.post('/login', login)
module.exports = router;
