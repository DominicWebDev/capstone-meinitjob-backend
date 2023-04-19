const express = require("express");
const router = express.Router();

const controller = require("./users-controller");

router.get("/", controller.getAllUsers);
router.get("/:id", controller.getUserById);
router.post("/", controller.addUser);
router.put("/", controller.updateUser);
router.get("/skills/:id", controller.getUserSkillsByUserId);
router.post("/skills", controller.addUserSkillsByUserId);
router.delete("/:user_id/skills/:skill_id", controller.deleteUserSkill);

module.exports = router;
