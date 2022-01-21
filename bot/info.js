module.exports = async function (bot, chatId, msg){
    await bot.sendMessage(chatId, `Sizning isminggiz ${msg.from.first_name}!`)
}