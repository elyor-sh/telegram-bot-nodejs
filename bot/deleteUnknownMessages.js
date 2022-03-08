const Chats = require("../models/Chats")
const Users = require("../models/Users")

module.exports = async function (bot, chatId, msg) {
    try {

        const {type} = msg.chat

        if(type === 'private'){

            const user = await Users.findOne({chatId})

            if(!user){
                return bot.sendMessage(chatId, `Foydalanuvchi topilmadi!`)
            }
    
            const {firstname, userName, is_bot, type, languageCode} = user
    
            const newUser = {firstname, userName, type, is_bot, languageCode, len: 0, unknownMessages: []}
    
            await Users.findByIdAndUpdate(user._id, newUser, {new: true})
    
            await bot.sendMessage(chatId, `Barcha xabarlar o'chirib yuborildi!`)

            return false

        }

        const chat = await Chats.findOne({chatId: msg.chat.id})

        if(!chat){
            return bot.sendMessage(chatId, `Xabarlar topilmadi!`)
        }

        const {title, fromAddedId, fromAddedName} = chat

        const newChat = {chatId: msg.chat.id, title, type, fromAddedId, fromAddedName, unknownMessages: []}

        await Chats.findByIdAndUpdate(chat._id, newChat, {new: true})

        await bot.sendMessage(chatId, `Barcha xabarlar o'chirib yuborildi!`)
        
    } catch (error) {
        console.log(error)
    }
}

