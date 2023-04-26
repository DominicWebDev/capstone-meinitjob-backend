exports.up = (knex) => {
  return knex.schema.createTable("matches", (table) => {
    table.increments();
    table
      .integer("fk_user_id")
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("RESTRICT")
      .onUpdate("CASCADE");
    table
      .integer("fk_company_id")
      .notNullable()
      .references("id")
      .inTable("companies")
      .onDelete("RESTRICT")
      .onUpdate("CASCADE");
    table
      .string("match_status")
      .defaultTo("unmatched"); /* other values are: accepted, ignored */
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("matches");
};
