const { Schema, model } = require('mongoose');

const GpsSchema = new Schema({
    id: {type: String, required: true},
    lat: {type: String, required: true},
    lon: {type: String, required: true}
}, {
    timestamps: true
});
module.exports = model('Gps',GpsSchema);
