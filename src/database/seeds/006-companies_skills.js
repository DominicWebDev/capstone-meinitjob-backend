exports.seed = function (knex) {
  return knex("companies_skills")
    .del()
    .then(function () {
      return knex("companies_skills").insert([
        {
          fk_skill_id: 1,
          fk_company_id: 1,
        },
        {
          fk_skill_id: 4,
          fk_company_id: 7,
        },
        {
          fk_skill_id: 7,
          fk_company_id: 4,
        },
      ]);
    });
};
