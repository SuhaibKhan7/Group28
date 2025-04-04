const express = require("express");
const router = express.Router();
router.get("/", getUser);
router.post("/", createUser);
module.exports = router;
