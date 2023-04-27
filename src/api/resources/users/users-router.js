const express = require("express");
const router = express.Router();

const controller = require("./users-controller");

router.get("/", controller.getAllUsers);
router.get("/:id", controller.getUserById);
router.post("/", controller.addUser);
router.put("/", controller.updateUser);
router.get("/matches/:user_id", controller.getMatchesByUserId);
router.delete("/match/:id", controller.deleteMatch);
router.post("/match", controller.addMatch);
router.put("/match", controller.updateMatch);
router.get("/skills/:id", controller.getUserSkillsByUserId);
router.post("/skill", controller.addUserSkillByUserId);
router.put("/skill", controller.updateUserSkill);
router.delete("/:user_id/skill/:skill_id", controller.deleteUserSkill);

module.exports = router;
