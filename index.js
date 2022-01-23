require('dotenv').config()
const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const bot = require('./bot')


const PORT = +process.env.PORT || 4200

const app = express()

app.use(express.static(path.join(__dirname, '/static')))

const start = async () => {

    try {

        await mongoose.connect(process.env.DB_URI, {
            useNewUrlParser: true
        })

        bot()

        app.listen(PORT, () => {
            console.log(`Server has been started in port ${PORT}`)
        })
        
    } catch (error) {
        console.log(error)
        process.exit(0)
    }

}

start()