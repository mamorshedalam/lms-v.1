const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
     name: String,
     author: String,
     category: String,
     // cover: {
     //      data: Buffer,
     //      contentType: String
     // },
})

module.exports = mongoose.model('Book', bookSchema);