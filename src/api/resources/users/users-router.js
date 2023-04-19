const express = require("express");
const router = express.Router();

const controller = require("./users-controller");

router.get("/", controller.getAllUsers);
router.get("/:id", controller.getUserById);
router.post("/", controller.addUser);
router.put("/", controller.updateUser);

module.exports = router;
