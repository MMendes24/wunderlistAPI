exports.seed = function (knex) {
  return knex("tasks").insert([
    {
      task: "buy groceries",
      completed: true,
      user_id: 1
    },
    {
      task: "defeat Wyoming",
      completed: false,
      user_id: 1
    }
  ])
}
