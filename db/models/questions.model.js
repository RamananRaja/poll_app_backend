const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema ({
    qno: {
        type: Number,
        required: true,
        unique: true
    },
    question: {
        type: String,
        required: true
    },
    option1: {
        type: String,
        required: true
    },
    option2: {
        type: String,
        required: true
    },
    option3: {
        type: String,
        required: true
    },
    option4: {
        type: String,
        required: true
    }
})
const Question = mongoose.model('Question', questionSchema);
module.exports = { Question };