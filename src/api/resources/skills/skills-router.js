const express = require("express");
const router = express.Router();

const controller = require("./skills-controller");

router.get("/", controller.getAllSkills);

module.exports = router;
