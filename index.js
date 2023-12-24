
//HAPPY CODING  🤩🚀😃

//this is our main (index.js) file and we connent paths, mongoDB and .env here,
//from node.js to Routes folder then from Routes folder to 
//Controllers folder (which itself connected to its Schema (structure) folder).

require('dotenv').config()

const cors = require('cors')
const port = process.env.SERVER_PORT
const express = require('express')
const ConnectDB = require('./Database/database')

const app = express()
app.use(express.json())
app.use(cors())
ConnectDB()

//Routes

app.use('/api/users', require('./Router/users'))

//API or paths

app.listen(port, () => {console.log(`server is running on port ${port}`)})

