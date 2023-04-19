exports.up = (knex) => {
  return knex.schema
    .createTable("users", (table) => {
      table.increments();
      table.string("email", 128).notNullable().unique();
      table.string("image").unique();
      table.string("first_name", 128).notNullable();
      table.string("last_name", 128).notNullable();
      table.boolean("pref_remote");
      table.integer("pref_company_size");
      table.string("pref_sector", 60);
      table.string("description", 500);
      table.timestamps(true, true);
    })
    .createTable("companies", (table) => {
      table.increments();
      table.string("name", 128).notNullable().unique();
      table.string("location", 128).notNullable();
      table.boolean("remote").notNullable();
      table.integer("number_of_employees", 128).notNullable();
      table.integer("revenue", 50).notNullable();
      table.string("sector", 128).notNullable();
      table.string("established", 128).notNullable();
      table.string("homepage").notNullable();
      table.string("description", 3500).notNullable();
      table.string("logo").notNullable();
      table.timestamps(true, true);
    })
    .createTable("skills", (table) => {
      table.increments();
      table.string("name").notNullable();
      table.integer("level").notNullable();
      table.timestamps(true, true);
    })
    .createTable("users_skills", (table) => {
      table.increments();
      table
        .integer("fk_user_id")
        .notNullable()
        .references("id")
        .inTable("users")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
      table
        .integer("fk_skill_id")
        .notNullable()
        .references("id")
        .inTable("skills")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");

      table.timestamps(true, true);
    })
    .createTable("companies_skills", (table) => {
      table.increments();
      table
        .integer("fk_company_id")
        .notNullable()
        .references("id")
        .inTable("companies")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
      table
        .integer("fk_skill_id")
        .notNullable()
        .references("id")
        .inTable("skills")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");

      table.timestamps(true, true);
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTable("companies_skills")
    .dropTable("users_skills")
    .dropTable("skills")
    .dropTable("companies")
    .dropTable("users");
};
