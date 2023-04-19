const express = require("express");
const router = express.Router();

const controller = require("./companies-controller");

router.get("/", controller.getAllCompanies);
router.get("/:id", controller.getCompanyById);
router.get("/skills/:id", controller.getCompanySkillsByCompanyId);

module.exports = router;
