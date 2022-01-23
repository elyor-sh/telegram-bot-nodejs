const Users = require("../../models/Users")

module.exports = async function (bot, msg){

    const user = await Users.findOne({chatId: msg.from.id})

    if(!user){
        await bot.sendMessage(msg.from.id, `Xabarlar topilmadi!`)
        return false
    }

    const {unknownMessages} = user

    const sendMessage = async (text) =>{
        await bot.sendMessage(msg.from.id, text)
    }

    unknownMessages.map(item => {
        sendMessage(item)
    })

}