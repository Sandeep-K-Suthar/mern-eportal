const {connect} = require('mongoose')
require('dotenv').config()

const ConnectDB = async () => {
await connect(process.env.MONGO_URL)
    console.log("DB Connected")
}

module.exports = ConnectDB