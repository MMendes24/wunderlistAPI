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
        .defaultTo("user")
        .references("roles.id")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE")
    })
}

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("roles").dropTableIfExists("users")
}
