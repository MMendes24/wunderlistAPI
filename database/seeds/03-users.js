exports.seed = function (knex) {
  return knex("users").insert([
    {
      username: "user1",
      password: "password",
      email: "mars@mars.com",
      name: "mars",
      role: 1, 
      phone: "123-456-7890"
    },
  ])
}