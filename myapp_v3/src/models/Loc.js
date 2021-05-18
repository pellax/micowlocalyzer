const { Schema, model } = require('mongoose');

const LocSchema = new Schema({
    id: {type: String, required: true},
    name: {type: String, required: true}
}, {
    timestamps: true
});

module.exports = model('Loc',LocSchema);
