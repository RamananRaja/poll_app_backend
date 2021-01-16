const mongoose = require('mongoose');
//answer schema
const answerSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    qid: {
        type: String,
        required: true
    },
    ans: {
        type: String
    },
    question: {
        type: String
    }
})

const Answer = mongoose.model('Answer', answerSchema);
module.exports = { Answer };