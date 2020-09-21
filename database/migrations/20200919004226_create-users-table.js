exports.up = function (knex) {
  return knex.schema
    .createTable("roles", (tbl) => {
      tbl.increments()
      tbl.string("name", 128).notNullable().unique()
    })
    .createTable("users", (tbl) => {
      tbl.increments()
      tbl.string("username", 128).notNullable().unique().index()
        tbl.string("password", 256).notNullable()
        tbl.string("name", 128).notNullable().unique()
        tbl.string("email", 256).notNullable().unique()
        tbl.string("phone", 128)

      tbl
        .integer("role")
        .unsigned()
        .defaultTo(2)
        .references("roles.id")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE")
    })
    .createTable("tasks", tbl => {
      tbl.increments()
      tbl.string("task", 128).notNullable()
      
      tbl.boolean("completed")
      .notNullable()
      .defaultTo(false)

      tbl.integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");

      tbl.string("date", 128).index()
    })
}

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("tasks").dropTableIfExists("users").dropTableIfExists("roles")
}
