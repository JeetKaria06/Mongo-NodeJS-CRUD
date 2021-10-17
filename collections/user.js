var mongoose = require('mongoose');

var schema = mongoose.Schema;

var UserSchema = new schema({
    // userId: {type: schema.Types.ObjectId, index: true},
    name: {type: String, required: true},
    projectIds: {type: [schema.Types.ObjectId]}
});

module.exports = mongoose.model("User", UserSchema);