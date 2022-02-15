const Chats = require("../../models/Chats")
const Users = require("../../models/Users")

module.exports = async function (bot, msg){

    try {

        const { type } = msg.chat ? msg.chat : msg.message.chat
    
        if(type === 'private'){
    
            const user = await Users.findOne({chatId: msg.message.chat.id})
    
            if(!user){
                await bot.sendMessage(msg.message.chat.id, `Xabarlar topilmadi!`)
                return false
            }
        
            const {unknownMessages} = user

            await bot.sendMessage(msg.message.chat.id, JSON.stringify(unknownMessages, null, 4))
        
        }
    
        const chat = await Chats.findOne({chatId: msg.message.chat.id})
    
        if(!chat){
          return bot.sendMessage(msg.message.chat.id, `Xabarlar topilmadi!`)
        }
    
        const {unknownMessages} = chat

        if(unknownMessages.length < 1){
            return bot.sendMessage(msg.message.chat.id, `Xabarlar topilmadi!`)
          }

        await bot.sendMessage(msg.message.chat.id, JSON.stringify(unknownMessages, null, 4))
        
    } catch (error) {
        console.log(error)
    }

}