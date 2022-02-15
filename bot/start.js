const path = require('path')
const Chats = require('../models/Chats')
const Users = require("../models/Users")


module.exports = async function (bot, chatId, msg) {

    try {

        const { type } = msg.chat

        if(type === 'private'){
            const {id, first_name, username, is_bot, language_code} = msg.from
    
            if (!id) {
                throw new Error('Id topilmadi')
            }
    
            const candidate = await Users.findOne({chatId: id})
    
            if(!candidate){
                const user = new Users({chatId: id, firstName: first_name ? first_name : '', userName: username ? username: '', type: type ? type : '', isBot: is_bot, languageCode: language_code })
                await user.save()
            }
    
            return bot.sendPhoto(chatId, path.join(__dirname + '/..' + '/static/codeinventors.jpg'), {caption: "@codeinventors kanali botiga xush kelibsiz!"})
        }

        const oldChat = await Chats.findOne({chatId: msg.chat.id})

        const obj = {chatId: msg.chat.id, title: msg.chat.title, type: type, fromAddedId: msg.from.id, fromAddedName: msg.from.first_name, messages: []}

        const chat = new Chats(obj)

        if(!oldChat){

            await chat.save()

            return bot.sendPhoto(chatId, path.join(__dirname + '/..' + '/static/codeinventors.jpg'), {caption: "@codeinventors kanali botiga xush kelibsiz!"})

        }

        await Chats.findByIdAndUpdate(oldChat._id, obj, {new: true})

        return bot.sendPhoto(chatId, path.join(__dirname + '/..' + '/static/codeinventors.jpg'), {caption: "@codeinventors kanali botiga xush kelibsiz!"})


    } catch (error) {
        console.log(error)
    }

}