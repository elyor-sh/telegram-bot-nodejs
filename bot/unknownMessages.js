const Messages = require("../models/Messages")
const Users = require("../models/Users")

module.exports = async function (chatId, bot, msg){

    try {

        await bot.sendMessage(chatId,  `Sizni tushuna olmayapman!`)

        const messages = Messages.findOne({owner: msg.from.id})

        const user = Users.findOne({chatId: msg.from.id})

        console.log(messages)
        console.log(user)

        let texts = []
        let count = 0
        if(messages && messages.text && messages.len){
            texts = messages.text
            count = messages.len
        }

        if(count <= 50){
            texts.push(msg.text)
            count++
        }else {
            texts.shift()
            texts.push(msg.text)
        }

        let newMessages = {}

        if(messages && messages.text && messages.len && messages._id){
             newMessages = {...messages, text: texts, len: count}
             await Messages.findByIdAndUpdate(messages._id, newMessages, {new: true})
        }else{
            newMessages = new Messages({text: texts, len: count, owner: msg.from.id})
            await newMessages.save()
        }
        
    } catch (error) {
        console.log(error)
    }
}