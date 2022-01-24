const TelegramApi = require('node-telegram-bot-api')
const callbackQuery = require('./callbackQuery')
const deleteUnknownMessages = require('./deleteUnknownMessages')
const info = require('./info')
const message = require('./message')
const start = require('./start')
const unknownMessages = require('./unknownMessages')
const token = process.env.token
const bot = new TelegramApi(token, { polling: true })


module.exports = async function () {
    bot.setMyCommands([
        { command: '/start', description: `Boshlang'ich salomlashish` },
        { command: '/info', description: `Siz haqinggizda ma'lumotlar` },
        { command: '/unknownmessage', description: `Javobsiz qoldirilgan oxirgi 50 ta xabar!` },
        { command: '/deleteunknownmessage', description: `Oxirgi 50 ta xabarni o'chirib yuborish` },
    ])

    bot.on('message', async msg => {

        const text = msg.text
        const chatId = msg.chat.id

        const isMatch = (arg) => {
            const regex = new RegExp(`/${arg}(.+)`)
            const regex2 = new RegExp(`/${arg} (.+)`)
            return (regex.test(text) || regex2.test(text) || text === `/${arg}`)
        }

        if(isMatch('start')){
            await start(bot, chatId, msg)
            return
        }

        if(isMatch('info')){
            await info(bot, chatId, msg)
            return
        }

        if(isMatch('unknownmessage')){
            await message(bot, chatId, msg)
            return
        }
        
        if(isMatch('deleteunknownmessage')){
            await deleteUnknownMessages(bot, chatId, msg)
            return
        }

        return unknownMessages(chatId, bot, msg)

    })

    callbackQuery(bot)
}