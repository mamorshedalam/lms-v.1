const Book = require('../model/Book');

const getBook = async (req, res) => {
     try {
          const book = await Book.find(req.body);
          res.status(200).json(book);
     } catch (err) { console.error(err) }
}

const createBook = async (req, res) => {
     try {
          const book = await Book.create(req.body);
          res.status(200).json(book);
     } catch (err) { console.error(err) }
}

const deleteBook = async (req, res) => {
     try {
          const book = await Book.deleteOne({ _id: req.body.id }).exec();
          res.status(200).json(book);
     } catch (err) { console.error(err) }
}

module.exports = { getBook, createBook, deleteBook };