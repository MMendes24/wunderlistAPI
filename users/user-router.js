const router = require("express").Router()
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")

const Users = require("./user-model.js")

router.get("/", restricted, checkRole("admin"), (req, res) => {
  Users.find()
    .then((users) => {
      res.status(200).json({ data: users, current_user: req.jwt })
    })
    .catch((err) => res.send(err))
})

router.get("/:id", restricted, checkRole("admin"), (req, res) => {
  Users.findById(req.params.id)
    .then((users) => {
      res.status(200).json({ data: users, current_user: req.jwt })
    })
    .catch((err) => res.send(err))
})



router.post("/register", (req, res) => {
  const credentials = req.body

  if (isValid(credentials)) {
    const rounds = process.env.HASH_ROUNDS || 4
    const hash = bcryptjs.hashSync(credentials.password, Number(rounds))
    credentials.password = hash

    Users.add(credentials)
      .then((user) => {
        const token = makeJwt(user)
        res.status(201).json({ data: user, token })
      })
      .catch((error) => {
        res.status(500).json({ message: error.message })
      })
  } else {
    res.status(400).json({
      message: "please provide username, password, name and email",
    })
  }
})

router.post("/login", (req, res) => {
  const { username, password } = req.body

  if (Boolean(username && password)) {
    Users.findBy({ username: username })
      .then(([user]) => {
        if (user && bcryptjs.compareSync(password, user.password)) {
          const token = makeJwt(user)

          res
            .status(200)
            .json({
              message: "welcome back",
              data: { user_id: user.id, username: user.username, },
              token,
            })
        } else {
          res.status(401).json({ message: "Invalid credentials" })
        }
      })
      .catch((error) => {
        res.status(500).json({ message: error.message })
      })
  } else {
    res.status(400).json({
      message: "please provide username and the password",
    })
  }
})

router.delete("/:id", restricted, checkRole("admin"), (req, res) => {
  const id = req.params.id
  if (Users.findById(id)) {
    Users.remove(id)
      .then((user) => {
        res.status(200).json({ message: "user has been removed", user_id: id })
      })
      .catch((err) => {
        res.status(500).json({ message: err.message })
      })
  } else {
    res.status(400).json({message: "wrong id"})
  }
})

router.put("/:id", restricted, (req, res) => {
  const id = req.params.id
  if (Users.findById(id)) {
    Users.update(req.body, id)
      .then((user) => {
        res.status(200).json({ message: "user has been updated" })
      })
      .catch((err) => {
        res.status(500).json({ message: "no data found in the request",error: err.message })
      })
  }
})

function isValid(user) {
  return Boolean(
    user.username &&
      user.password &&
      user.name &&
      user.email &&
      typeof user.password === "string"
  )
}

function makeJwt(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    role: user.role,
  }

  const secret = "it is secret"

  const options = {
    expiresIn: "1h",
  }

  return jwt.sign(payload, secret, options)
}

//middleware

function checkRole(role) {
  return function (req, res, next) {
    if (role === req.jwt.role) {
      next()
    } else {
      res.status(403).json({ you: "have no power here" })
    }
  }
}

function restricted(req, res, next) {
  const token = req.headers.authorization
  const secret = "it is secret"
  if (token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ you: "wrong token" })
      } else {
        req.jwt = decodedToken
      }
      next()
    })
  } else {
    res.status(401).json({ you: "no token found in the header" })
  }
}

module.exports = router
