const MessageId = require("../models/MessageId")

module.exports = async function (bot, msg) {
    try {

        const messages = await MessageId.findOne({chatId: msg.chat.id})

        if(!messages){
            const newMessages = new MessageId({
                chatId: msg.chat.id,
                messageIds: [msg.message_id]
            })
    
            return newMessages.save()
        }
    
        const {messageIds} = messages
    
        if(messageIds.length >= 10){
            console.log('ids', messageIds)

           await bot.deleteMessage(msg.chat.id, messageIds[0]);

            messageIds.shift()

            return MessageId.findByIdAndUpdate(messages._id, {chatId:msg.chat.id, messageIds: [...messageIds, msg.message_id] }, {new: true})

        }

        await MessageId.findByIdAndUpdate(messages._id, {chatId:msg.chat.id, messageIds: [...messageIds, msg.message_id] }, {new: true})
        
    } catch (error) {
        console.log(error)
    }
}