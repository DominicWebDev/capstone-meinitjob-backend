exports.seed = function (knex) {
  return knex("companies_skills")
    .del()
    .then(function () {
      return knex("companies_skills").insert([
        {
          fk_skill_id: 1,
          fk_company_id: 1,
        },
      ]);
    });
};
