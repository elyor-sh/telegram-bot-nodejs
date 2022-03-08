const {Schema, model} = require('mongoose')

const schema = new Schema ({
    chatId: {type: Number, required: true, unique: true},
    title: {type: String, required: true},
    type: {type: String},
    fromAddedId: {type: Number},
    fromAddedName: {type:String},
    unknownMessages: {type: Array, default: []}
})

module.exports = model('Chat', schema)