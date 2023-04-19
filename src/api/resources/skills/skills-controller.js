const SkillsService = require("./skills-service");

const getAllSkills = (request, response) =>
  SkillsService.find()
    .then((skills) => response.status(200).json({ skills }))
    .catch((error) => {
      console.log("Fehler beim Erhalten von allen Skills. ", error);
      return response.status(500).json({
        message: "Fehler beim Erhalten von allen Skills.",
      });
    });

module.exports = {
  getAllSkills,
};
