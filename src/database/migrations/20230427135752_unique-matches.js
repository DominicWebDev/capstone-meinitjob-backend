exports.up = (knex) => {
  return knex.schema.alterTable("matches", function (table) {
    table.unique(["fk_user_id", "fk_company_id"]);
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable("matches", function (table) {
    table.dropUnique(["fk_user_id", "fk_company_id"]);
  });
};
