exports.seed = function (knex) {
  return knex("users_skills")
    .del()
    .then(function () {
      return knex("users_skills").insert([
        {
          fk_skill_id: 1,
          fk_user_id: 1,
        },
      ]);
    });
};
