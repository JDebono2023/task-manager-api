const mongoose = require('mongoose')

// define model

const taskSchema = new mongoose.Schema({
    Description: {
        type: String,
        trim: true,
        required: true,
    },
    Completed: {
        type: Boolean,
        required: false,
        default: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
})

const Tasks = mongoose.model('TaskList', taskSchema)

module.exports = Tasks