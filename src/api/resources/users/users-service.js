const db = require("../../../database/db");

// get all users
const find = () => db("users");

const findById = (id) =>
  db("users")
    .where({ id })
    .first()
    .then((user) => user ?? null);

const findUserSkillsByUserId = (id) => {
  return db("users_skills as us")
    .join("users as u", "u.id", "us.fk_user_id")
    .select("us.fk_skill_id", "us.id")
    .where("u.id", id)
    .then((userSkills) => {
      console.log(userSkills, "DieserOutPut");
      if (!userSkills.length) return null;
      return db("skills").then((skills) => {
        console.log(skills, "allSkillsFetched");
        const userSkillsWithNames = userSkills.map((userSkill) => {
          const skill = skills.find(
            (skill) => skill.id === userSkill.fk_skill_id
          );
          return {
            ...userSkill,
            skill_name: skill.name,
            skill_level: skill.level,
          };
        });
        console.log(userSkillsWithNames, "userSkillsWithNames");
        return userSkillsWithNames;
      });
    });
};

const add = (user) =>
  db("users")
    .insert(user, "id")
    .then((newUser) => findById(newUser[0].id));

const update = (id, changes) => db("users").where({ id }).update(changes);

const findUserSkillbyId = (id) =>
  db("users_skills")
    .where({ id })
    .first()
    .then((userSkill) => userSkill ?? null);

const addUserSkill = (userSkill) => {
  return findUserSkillsByUserId(userSkill.fk_user_id).then((skills) => {
    if (skills) {
      const skillExists = skills.find(
        (skill) => skill.fk_skill_id === userSkill.fk_skill_id
      );
      if (skillExists) {
        return null;
      }
      return db("users_skills")
        .insert(userSkill, "id")
        .then((newUserSkill) => findUserSkillbyId(newUserSkill[0].id));
    }
    return db("users_skills")
      .insert(userSkill, "id")
      .then((newUserSkill) => findUserSkillbyId(newUserSkill[0].id));
  });
};

const findSkillByNameAndId = (name, level) =>
  db("skills")
    .where("name", name)
    .andWhere("level", level)
    .first()
    .then((skill) => skill ?? null);

const updateUserSkill = (id, name, level) => {
  return findSkillByNameAndId(name, level).then((foundSkill) => {
    console.log("I HAVE FOUND THE RIGHT SKILL", foundSkill);
    return db("users_skills")
      .where({ id })
      .update({ fk_skill_id: foundSkill.id });
  });
};

const deleteUserSkill = ({ user_id, skill_id }) =>
  db("users_skills")
    .where("fk_user_id", user_id)
    .andWhere("fk_skill_id", skill_id)
    .del();

const findMatchById = (id) =>
  db("matches")
    .where({ id })
    .first()
    .then((match) => match ?? null);

const findMatchesByUserId = (fk_user_id) =>
  db("matches")
    .where("fk_user_id", fk_user_id)
    .then((matches) =>
      matches.length ? matches : null
    ); /* TODO: IS matches AN ARRAY AND ALWAYS TRUTHY? */

const addMatch = (match) =>
  db("matches")
    .insert(match, "id")
    .then((newMatch) => findMatchById(newMatch[0].id));

const updateMatch = (id, changes) =>
  db("matches").where({ id }).update(changes);

const deleteMatch = (id) => db("matches").where("id", id).del();

module.exports = {
  find,
  findById,
  add,
  update,
  findUserSkillsByUserId,
  addUserSkill,
  updateUserSkill,
  deleteUserSkill,
  findMatchesByUserId,
  addMatch,
  updateMatch,
  deleteMatch,
};
