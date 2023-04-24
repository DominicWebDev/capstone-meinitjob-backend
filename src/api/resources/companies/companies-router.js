const express = require("express");
const router = express.Router();

const controller = require("./companies-controller");

router.get("/", controller.getAllCompanies);
router.get("/allskills", controller.getAllCompanySkills);
router.get("/skills/:id", controller.getCompanySkillsByCompanyId);
router.get("/:id", controller.getCompanyById);

module.exports = router;
