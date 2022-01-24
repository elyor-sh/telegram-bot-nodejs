const Chats = require("../../models/Chats")
const Users = require("../../models/Users")

module.exports = async function (bot, msg){

    try {

        // console.log(msg.message)

        const { type } = msg.message.chat

        const sendMessage = async (text) =>{
            await bot.sendMessage(msg.message.chat.id, text)
        }
    
        if(type === 'private'){
    
            const user = await Users.findOne({chatId: msg.message.chat.id})
    
            if(!user){
                await bot.sendMessage(msg.message.chat.id, `Xabarlar topilmadi!`)
                return false
            }
        
            const {unknownMessages} = user
        
            unknownMessages.map(item => {
                sendMessage(item)
            })
    
        }
    
        const chat = await Chats.findOne({chatId: msg.message.chat.id})
    
        if(!chat){
          return bot.sendMessage(msg.message.chat.id, `Xabarlar topilmadi!`)
        }
    
        const {unknownMessages} = chat

        if(unknownMessages.length < 1){
            return bot.sendMessage(msg.message.chat.id, `Xabarlar topilmadi!`)
          }

        console.log(unknownMessages)
        
        unknownMessages.map(item => {
            sendMessage(item)
        })
        
    } catch (error) {
        console.log(error)
    }

}