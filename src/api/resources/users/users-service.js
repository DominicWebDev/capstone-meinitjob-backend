const db = require("../../../database/db");

// get all users
const find = () => db("users");

const findById = (id) =>
  db("users")
    .where({ id })
    .first()
    .then((user) => user ?? null);

const add = (user) =>
  db("users")
    .insert(user, "id")
    .then((newUser) => findById(newUser[0].id));

const update = (id, changes) => db("users").where({ id }).update(changes);

module.exports = {
  find,
  findById,
  add,
  update,
};
