const express = require("express");
const router = express.Router();

const controller = require("./companies-controller");

router.get("/", controller.getAllCompanies);
router.get("/:id", controller.getCompanyById);

module.exports = router;
