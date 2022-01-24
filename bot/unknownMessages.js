const Chats = require("../models/Chats")
const Users = require("../models/Users")

module.exports = async function (chatId, bot, msg) {

    try {

        const { type } = msg.chat

        if (type === 'private') {

            await bot.sendMessage(chatId, `Sizni tushuna olmayapman!`)

            const user = await Users.findOne({ chatId })

            if (!user) {

                const newUser = new Users(
                    {
                        chatId: chatId,
                        firstName: msg.from.first_name ? msg.from.first_name : '',
                        userName: msg.from.username ? msg.from.username : '',
                        type: msg.chat.type ? msg.chat.type : '',
                        is_bot: msg.from.is_bot,
                        languageCode: msg.from.language_code,
                        len: 1,
                        unknownMessages: [msg.text]
                    }
                )

                await newUser.save()

                return false
            }

            const { firstName, userName, is_bot, type } = user

            if (user.len >= 50) {

                const arr = [...user.unknownMessages]

                arr.shift()

                arr.push(msg.text)

                const newUser = { chatId, firstName, userName, is_bot, type, unknownMessages: arr, len: 50 }

                await Users.findByIdAndUpdate(user._id, newUser, { new: true })

                return false
            }

            const arr = [...user.unknownMessages]

            arr.push(msg.text)

            const newUser = { chatId, firstName, userName, is_bot, type, len: user.len + 1, unknownMessages: arr, }

            return Users.findByIdAndUpdate(user._id, newUser, { new: true })
        }

        const chat = await Chats.findOne({chatId: msg.chat.id})

        if(!chat){
            const newChat = new Chats(
                {
                    chatId: msg.chat.id,
                    title: msg.chat.title,
                    type: type,
                    fromAddedId: msg.from.id, 
                    fromAddedName: msg.from.first_name,
                    unknownMessages: [msg.text]
                }
            )

            await newChat.save()

            return false
        }

        const {unknownMessages} = chat

        const arr = [...unknownMessages]

        if(unknownMessages.length >= 50){
            arr.shift()
        }

        arr.push(msg.text)

        const newChat = 
            {
                chatId: msg.chat.id,
                title: msg.chat.title,
                type: type,
                fromAddedId: msg.from.id, 
                fromAddedName: msg.from.first_name,
                unknownMessages: arr
            }
        
        return Chats.findByIdAndUpdate(chat._id, newChat, {new: true})


    } catch (error) {
        console.log(error)
    }
}