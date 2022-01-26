const TelegramApi = require('node-telegram-bot-api')
const Chats = require('../models/Chats')
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

        

        const isQuloq = () => {
            const regex1 = new RegExp(`qulo (.+)`)
            const regex2 = new RegExp(`quloq (.+)`)
            const regex3 = new RegExp(`qulo(.+)`)
            const regex4 = new RegExp(`quloq(.+)`)

            let newWord = msg.text.replace(/[^a-zа-яё]/gi, '').split('')
            newWord = Array.from(new Set(newWord))

            let arr = newWord.map(item => {
              return  item.toString().toLowerCase()
            })

            arr = Array.from(new Set(arr))

            arr = arr.join('')

            let newQuloq = arr.split('').join(' ')

            if(newQuloq && newQuloq.includes('qulo')){
                return true
            }


            return (text.toLowerCase() === 'quloq' ||
                    text.toLowerCase() === 'qulo' ||
                    regex1.test(text.toLowerCase()) ||
                    regex2.test(text.toLowerCase()) ||
                    regex3.test(text.toLowerCase()) ||
                    regex4.test(text.toLowerCase()) ||
                    arr === 'quloq' ||
                    arr === 'qulo' ||
                    regex1.test(arr) ||
                    regex2.test(arr) ||
                    regex3.test(arr) ||
                    regex4.test(arr) 
            )

            
        }

        const isMatch = (arg) => {
            const regex = new RegExp(`/${arg}(.+)`)
            const regex2 = new RegExp(`/${arg} (.+)`)
            return (regex.test(text) || regex2.test(text) || text === `/${arg}`)
        }

        if(isQuloq()){
            await bot.sendMessage(chatId, `<i>Guruhda <b>QULOQ</b> so'zi taqiqlangan❌</i>`, {parse_mode: 'HTML'})
            return
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