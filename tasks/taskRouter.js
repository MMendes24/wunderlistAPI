const router = require("express").Router()
const Tasks = require('./taskModel')

router.get('/', (req, res) => {
    Tasks.find()
    .then(thenRes => {
        res.status(200).json(thenRes)
    })
    .catch( err => {
        console.log("test error")
    })
})

module.exports = router