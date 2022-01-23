const Users = require("../models/Users")

module.exports = async function (bot, chatId, msg) {
    try {

        const user = await Users.findOne({chatId})

        if(!user){
            return bot.sendMessage(chatId, `Foydalanuvchi topilmadi!`)
        }

        const {firstname, userName, is_bot, type, languageCode} = user

        const newUser = {firstname, userName, type, is_bot, len: 0, unknownMessages: []}

        await Users.findByIdAndUpdate(user._id, newUser, {new: true})

        await bot.sendMessage(chatId, `Barcha xabarlar o'chirib yuborildi!`)
        
    } catch (error) {
        console.log(error)
    }
}