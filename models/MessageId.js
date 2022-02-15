const {Schema, model} = require('mongoose')

const schema = new Schema ({
    chatId: {type: Number, required: true, unique: true},
    messageIds: {type: [], required: true},
})

module.exports = model('MessageId', schema)