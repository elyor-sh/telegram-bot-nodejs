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

       const user = await Users.findOne({chatId:chatId})

       const {unknownMessages} = user

       if(!unknownMessages){
         await bot.sendMessage(chatId, `Xabarlar topilmadi!`)
         return false
       }

       await bot.sendMessage(chatId, `Topilgan xabarlar soni ${unknownMessages.length} ta!`, keyOptions)
        
    } catch (error) {
        console.log(error)
    }
}