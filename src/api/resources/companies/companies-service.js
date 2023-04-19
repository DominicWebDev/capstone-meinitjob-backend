const db = require("../../../database/db");

// get all companies
const find = () => db("companies");

const findById = (id) =>
  db("companies")
    .where({ id })
    .first()
    .then((company) => company ?? null);

module.exports = {
  find,
  findById,
};
