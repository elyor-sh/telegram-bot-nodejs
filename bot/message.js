const Chats = require("../models/Chats")
const Users = require("../models/Users")

const keyOptions = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [{text: 'Xabarlarni olish', callback_data: 'getMessages'}]
    ]
  })
}

module.exports = async function (bot, chatId, msg) {
    try {

      const { type } = msg.chat

      if(type === 'private'){

        const user = await Users.findOne({chatId:chatId})

        const {unknownMessages} = user
 
        if(!unknownMessages){
          await bot.sendMessage(chatId, `Xabarlar topilmadi!`)
          return false
        }
 
        return bot.sendMessage(chatId, `Topilgan xabarlar soni ${unknownMessages.length} ta!`, keyOptions)

      }

      const chat = await Chats.findOne({chatId})

      if(!chat){
        return bot.sendMessage(chatId, `Xabarlar topilmadi!`)
      }

      const {unknownMessages} = chat

      if(!unknownMessages){
        await bot.sendMessage(chatId, `Xabarlar topilmadi!`)
        return false
      }

      return bot.sendMessage(chatId, `Topilgan xabarlar soni ${unknownMessages.length} ta!`, keyOptions)
        
    } catch (error) {
        console.log(error)
    }
}