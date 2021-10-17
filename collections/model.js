var mongoose = require('mongoose');

var schema = mongoose.Schema;

var ModelSchema = new schema({
    userId: {type: schema.Types.ObjectId, required: true},
    projectId: {type: schema.Types.ObjectId, required: true},
    name: {type: String, required: true},
    parameters: {type: Object, required: true},
    syntheticData: {type: [Object]},
});

module.exports = mongoose.model("Model", ModelSchema);