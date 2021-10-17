var mongoose = require('mongoose');

var schema = mongoose.Schema;

var ProjectSchema = new schema({
    userId: {type: schema.Types.ObjectId, required: true},
    name: {type: String, required: true},
    realData: {type: [Object]},
    modelIds: {type: [schema.Types.ObjectId]}
});

module.exports = mongoose.model("Project", ProjectSchema);