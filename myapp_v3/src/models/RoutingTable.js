const { Schema, model } = require('mongoose');

const RoutingTableSchema = new Schema({
	address:{type: String, required: true},
    	metric: {type: String, required: true},
    	lastSeqNo: {type: String, required: true},
    	timeout: {type: String, required: true},
        via: {type: String, required: true},
        position:{type: String, required: true}
}, {
    timestamps: true
});
module.exports = model('RoutingTable',RoutingTableSchema)
