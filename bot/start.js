const path = require('path')
const Users = require("../models/Users")


module.exports = async function (bot, chatId, msg) {

    try {

        const { type } = msg.chat
        const {id, first_name, username, is_bot, language_code} = msg.from

        if (!id) {
            throw new Error('Id topilmadi')
        }

        const candidate = await Users.findOne({chatId: id})

        if(!candidate){
            const user = new Users({chatId: id, firstName: first_name ? first_name : '', userName: username ? username: '', type: type ? type : '', isBot: is_bot, languageCode: language_code })
            await user.save()
        }

        await bot.sendPhoto(chatId, path.join(__dirname + '/..' + '/static/codeinventors.jpg'), {caption: "@codeinventors kanali botiga xush kelibsiz!"})

    } catch (error) {
        console.log(error)
    }

}