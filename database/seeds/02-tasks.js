exports.seed = function (knex) {
  // no tasks to seed currently since there are no users to corroborate them with
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
    },
  ])
}
