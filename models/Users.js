const {Schema, model} = require('mongoose')

const schema = new Schema ({
    chatId: {type: Number, required: true, unique: true},
    firstName: {type: String, required: true},
    userName: {type: String},
    is_bot: {type: Boolean, default: false},
    type: {type: String},
    languageCode: {type: String, default: ''},
    len: {type: Number, default: 0},
    unknownMessages: {type: Array, default: []}
})

module.exports = model('User', schema)