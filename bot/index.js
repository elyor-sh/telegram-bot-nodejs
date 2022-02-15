const TelegramApi = require('node-telegram-bot-api')
const Chats = require('../models/Chats')
const ban = require('./ban')
const callbackQuery = require('./callbackQuery')
const clearChat = require('./clearChat')
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

        if(ban(msg)){
            await bot.sendMessage(chatId, `<i>Guruhda <b>QULOQ</b> so'zi taqiqlangan❌</i>`, {parse_mode: 'HTML', reply_to_message_id: msg.message_id})
            if(msg.from.id !== 1467016852){
                await bot.banChatMember(chatId, msg.from.id, {
                    until_date: Math.round((Date.now() + 60000)/1000)
                })
            }
            return
        }

        if(msg.chat && msg.chat.type === 'supergroup'){
            await clearChat(bot, msg)
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