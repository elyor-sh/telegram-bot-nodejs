const Users = require("../models/Users")

module.exports = async function (bot, chatId, msg){

    const user = await Users.findOne({chatId})

    if(!user){
        return bot.sendMessage(chatId, `Sizning isminggiz ${msg.from.first_name}!`)
    }

    const {len} = user

    if(len > 0){
        return bot.sendMessage(chatId, `Sizning isminggiz ${msg.from.first_name}, sizda ${len} ta bot tomonidan javobsiz qoldirilgan xabarlar bor!`)
    }

    await bot.sendMessage(chatId, `Sizning isminggiz ${msg.from.first_name}, hamma xabarlaringgizga bot tomonidan javob berilgan`)

}