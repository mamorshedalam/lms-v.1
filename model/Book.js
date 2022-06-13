const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
     name: String,
     author: String,
     category: String,
     cover: {
          public_id: {
               type: String,
          },
          url: {
               type: String,
          }
     }
})

module.exports = mongoose.model('Book', bookSchema);