const {Schema, model} = require('mongoose')

const schema = new Schema ({
    chatId: {type: Number, required: true, unique: true},
    firstName: {type: String, required: true},
    userName: {type: String},
    is_bot: {type: Boolean, default: false},
    type: {type: String},
    languageCode: {type: String, default: ''}
})

module.exports = model('User', schema)