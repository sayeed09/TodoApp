const mongoose = require('mongoose');

const todos = mongoose.Schema({
    cookieId: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    isCompleted: {
        type: Boolean,
        required: true
    }
}, { timeStamps: true }
)
const Todo = mongoose.model('Todo', todos);

module.exports = { Todo }