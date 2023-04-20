const mongoose = require('mongoose');

const CaseSchema = mongoose.Schema(
    {
        name : String,
        age : Number,
        gender: String
    }
);

module.exports = mongoose.model('case', CaseSchema);