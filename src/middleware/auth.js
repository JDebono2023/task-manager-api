const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })

        if (!user) { throw new Error() }
        req.token = token
        req.user = user
        next()
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate' })

    }

}

module.exports = auth

// EXPRESS MIDDLEWARE
// 
// Without Middleware: new request to server -> run route handler
// 
// With Middleware: new request -> custom function for the server to do something -> run route handler
// 
// app.use((req, res, next) => {
//     if (req.method === 'GET') {
//         res.send('GET requests are disabled')

//     } else { next() }
// })

// app.use((req, res, next) => {
//     //if (req.method === 'GET' || req.method === 'POST' || req.method === 'PATCH' || req.method === 'DELETE') {
//     res.status(503).send('Site Under maintenance')
// })