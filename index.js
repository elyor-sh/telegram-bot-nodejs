require('dotenv').config()
const express = require('express')
const path = require('path')
const TelegramApi = require('node-telegram-bot-api')

const token = process.env.token

const PORT = +process.env.PORT || 4200

console.log(token)

const app = express()

app.use(express.static(path.resolve(__dirname, '/static')))

const bot = new TelegramApi(token, {polling: true})

async function sendMessage (chatId, text) {
    await bot.sendMessage(chatId, text)
}

const start = () => {

    try {

        bot.setMyCommands([
            {command: '/start', description: `Boshlang'ich salomlashish`},
            {command: '/info', description: `Siz haqinggizda ma'lumotlar`},
            {command: '/myphoto', description: `Internetda tarqalgan rasmim`},
        ])
        
        bot.on('message', async msg => {
            console.log(msg)
        
            const text = msg.text
            const chatId = msg.chat.id
        
            switch (text) {
                case '/start':
                    await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/ccd/a8d/ccda8d5d-d492-4393-8bb7-e33f77c24907/1.webp')
                    await sendMessage(chatId, 'Assalomu alaykum, botimizga xush kelibsiz!')
                    return
                case '/info':
                    await sendMessage(chatId, `Sizning isminggiz ${msg.from.first_name}!`)
                    return
                case '/myphoto':
                    await sendMessage(chatId, `Sizning internetda tarqalgan rasmlariz:`)
                    await bot.sendPhoto(chatId, 'https://guarded-dawn-61718.herokuapp.com/20012022-142516_973.jpg');
                    return
                default:
                    sendMessage(chatId, `Sizni tushuna olmayapman!`)
                    return 
            }
        })

        app.listen(PORT, () => {
            console.log(`Server has been started in port ${PORT}`)
        })
        
    } catch (error) {
        
    }

}

start()