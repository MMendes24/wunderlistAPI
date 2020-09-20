const router = require("express").Router()

const Tasks = require('./taskModel')

const taskAuthenticator = require('./taskAuthenticator')

router.get('/', (req, res) => {
    Tasks.find()
        .then(thenRes => {
            res.status(200).json(thenRes)
        })
        .catch(err => {
            res.status(500).json({ errorMessage: "Internal server error." })
        })
})

router.get('/:id', (req, res) => {
    const id = req.params.id

    Tasks.findById(id)
        .then(thenRes => {
            if (thenRes) {
                res.status(200).json(thenRes)
            } else {
                res.status(404).json({ errorMessage: "Record does not exist." })
            }
        })
        .catch(err => {
            res.status(500).json({ errorMessage: "Internal server error." })
        })
})

router.get('/user/:id', (req, res) => {
    const id = req.params.id

    Tasks.findByUserId(id)
        .then(thenRes => {
            if (thenRes[0]) {
                res.status(200).json(thenRes)
            } else {
                res.status(404).json({ errorMessage: "Record does not exist." })
            }
        })
        .catch(err => {
            res.status(500).json({ errorMessage: "Internal server error." })
        })
})

router.post('/', (req, res) => {
    const newTask = req.body
    const legitTask = taskAuthenticator(newTask)

    if (legitTask) {
        Tasks.create(newTask)
            .then(thenRes => {
                res.status(201).json(newTask)
            })
            .catch(err => {
                res.status(500).json({ errorMessage: "Internal server error." })
            })
    } else {
        res.status(400).json({ message: "Please provide a task and a user ID." });
    }
})

router.put('/:id', (req, res) => {
    const editedTask = req.body
    const id = req.params.id
    const legitTask = taskAuthenticator(editedTask)

    if (legitTask) {
        Tasks.edit(id, editedTask)
            .then(thenRes => {
                if (thenRes) {
                    res.status(204).json(editedTask)
                } else {
                    res.status(404).json({ errorMessage: "Record does not exist." })
                }
            })
            .catch(err => {
                res.status(500).json({ errorMessage: "Internal server error." })
            })
    } else {
        res.status(400).json({
            message: "Please provide a task and a user ID.",
        });
    }
})

router.delete('/:id', (req, res) => {
    const id = req.params.id

    Tasks.remove(id)
        .then(thenRes => {
            if (thenRes) {
                res.status(200).json(thenRes)
            } else {
                res.status(404).json({ errorMessage: "Record does not exist." })
            }
        })
        .catch(err => {
            res.status(500).json({ errorMessage: "Internal server error." })
        })
})


module.exports = router