require("dotenv").config()
const express = require("express")
const helmet = require("helmet")
const cors = require("cors")

//const usersRouter = require("../user/users-router")
const server = express()

server.use(helmet())
server.use(express.json())
server.use(cors())

server.get("/", (req, res) => {
    res.sendFile("index.html", { root: __dirname })
})

module.exports = server