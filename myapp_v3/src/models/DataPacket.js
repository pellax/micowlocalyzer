const { Schema, model } = require('mongoose');

const DataPacketSchema = new Schema({
    dst: {type: String, required: true},
    src: {type: String, required: true},
    type: {type: String, required: true},
    payloadvar: {type: String, required: true},
    sizExtra: {type: String, required: true},
    address:[{type: String, required: false}],
    metric: [{type: String, required: false}]
}, {
    timestamps: true
});
module.exports = model('DataPacket',DataPacketSchema);
