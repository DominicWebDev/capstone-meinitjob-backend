const db = require("../../../database/db");

// get all skills
const find = () => db("skills");

module.exports = {
  find,
};
