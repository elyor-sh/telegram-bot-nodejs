const TelegramApi = require('node-telegram-bot-api')
const info = require('./info')
const start = require('./start')
const unknownMessages = require('./unknownMessages')
const token = process.env.token
const bot = new TelegramApi(token, {polling: true})


module.exports = async function(){
    bot.setMyCommands([
        {command: '/start', description: `Boshlang'ich salomlashish`},
        {command: '/info', description: `Siz haqinggizda ma'lumotlar`},
        {command: '/message', description: `Adminga xabar qoldirish!`},
    ])
    
    bot.on('message', async msg => {
        console.log(msg)
    
        const text = msg.text
        const chatId = msg.chat.id
    
        switch (text) {
            case '/start':
                start(bot, chatId, msg)
                return
            case '/info':
                info(bot, chatId, msg)
                return
            case '/message':
                
                return
            default:
                unknownMessages(chatId, bot, msg)
                return 
        }
    })
}