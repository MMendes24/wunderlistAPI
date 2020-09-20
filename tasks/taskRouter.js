const router = require("express").Router()
const Tasks = require('./taskModel')

router.get('/', (req, res) => {
    Tasks.find()
        .then(thenRes => {
            res.status(200).json(thenRes)
        })
        .catch(err => {
            console.log("test error")
        })
})

router.get('/:id', (req, res) => {
    Tasks.findById(req.params.id)
        .then(thenRes => {
            res.status(200).json(thenRes)
        })
        .catch(err => {
            console.log("test error")
        })
})

router.get('/user/:id', (req, res) => {
    Tasks.findByUserId(req.params.id)
        .then(thenRes => {
            res.status(200).json(thenRes)
        })
        .catch(err => {
            console.log("test error")
        })
})

router.post('/', (req, res) => {
    const newTask = req.body

    Tasks.create(newTask)
        .then(thenRes => {
            res.status(201).json(newTask)
        })
        .catch(err => {
            res.status(500).json({ error: "what"})
        })
})

module.exports = router