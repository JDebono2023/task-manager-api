const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
//est port for use on heroku
const port = process.env.PORT

//parse the incoming data
app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => { console.log(`Server is up on port ${port}`) })

