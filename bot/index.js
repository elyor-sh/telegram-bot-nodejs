const TelegramApi = require('node-telegram-bot-api')
const callbackQuery = require('./callbackQuery')
const info = require('./info')
const message = require('./message')
const start = require('./start')
const unknownMessages = require('./unknownMessages')
const token = process.env.token
const bot = new TelegramApi(token, {polling: true})


module.exports = async function(){
    bot.setMyCommands([
        {command: '/start', description: `Boshlang'ich salomlashish`},
        {command: '/info', description: `Siz haqinggizda ma'lumotlar`},
        {command: '/unknownmessage', description: `Javobsiz qoldirilgan oxirgi 50 ta xabar!`},
    ])
    
    bot.on('message', async msg => {
    
        const text = msg.text
        const chatId = msg.chat.id
    
        switch (text) {
            case '/start':
                await start(bot, chatId, msg)
                return
            case '/info':
                await info(bot, chatId, msg)
                return
            case '/unknownmessage':
                await message(bot, chatId, msg)
                return
            default:
                await unknownMessages(chatId, bot, msg)
                return 
        }
    })

    callbackQuery(bot)
}