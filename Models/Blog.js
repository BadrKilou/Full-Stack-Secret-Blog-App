const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog'
    },
    title: {
        type: String,
        required: true
    },
    author: String,
    blog: {
        type: String,
        required: true
    },
    type: {
    type: String,
    default: 'community'
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Blog', blogSchema)