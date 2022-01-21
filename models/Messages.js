const {Schema, model} = require('mongoose')

const schema = new Schema ({
    text: {type: Array, required: true},
    owner: {type: Number, required: true},
    len: {type: Number,required: true, default: 0}
})

module.exports = model('Message', schema)