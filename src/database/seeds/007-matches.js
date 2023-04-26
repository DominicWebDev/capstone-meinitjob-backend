exports.seed = function (knex) {
  return knex("matches")
    .del()
    .then(function () {
      return knex("matches").insert([
        {
          fk_user_id: 1,
          fk_company_id: 1,
          match_status: "unmatched",
        },
        {
          fk_user_id: 1,
          fk_company_id: 7,
          match_status: "accepted",
        },
        {
          fk_user_id: 1,
          fk_company_id: 4,
          match_status: "ignored",
        },
      ]);
    });
};
