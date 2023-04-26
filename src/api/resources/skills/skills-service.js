const db = require("../../../database/db");

// get all skills
const find = () => db("skills");

// TODO: USE THIS HERE AND EXPORT IT INTO USERSERVICE!
/* const findSkillByNameAndId = (name, level) =>
  db("skills")
    .where("name", name)
    .andWhere("level", level)
    .first()
    .then((skill) => skill ?? null); */

module.exports = {
  find,
  /* findSkillByNameAndId, */
};
