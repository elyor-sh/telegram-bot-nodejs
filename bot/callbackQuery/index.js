const getMessages = require("./getMessages");

module.exports = async function (bot) {
    bot.on('callback_query', async msg => {
        switch (msg.data) {
            case 'getMessages':
                await getMessages(bot, msg)
                break;
            default:
                break;
        }
    })
}