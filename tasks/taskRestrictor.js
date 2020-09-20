const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const token = req.headers.authorization
    const secret = "it is secret"

    if (token) {
        jwt.verify(token, secret, (err, decodedToken) => {
            if (err) {
                res.status(401).json({ unauthorized: "Unauthorized token!" })
            } else {
                req.jwt = decodedToken
            }
            next(err)
        })
    } else {
        res.status(401).json({ error: "You must be logged in to perform this action." })
    }
}

