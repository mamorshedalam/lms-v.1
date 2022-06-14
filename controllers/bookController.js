const Book = require('../model/Book');
const cloudinary = require('../config/cloudinary');

const getBook = async (req, res) => {
     try {
          const book = await Book.find(req.body);
          res.status(200).json(book);
     } catch (err) { console.error(err) }
}

const createBook = (req, res) => {
     const data = req.body;
     try {
          let bookList = [];
          data.forEach(async data => {
               const { name, author, category, cover } = data;
               const result = await cloudinary.uploader.upload(cover, {
                    folder: "books",
                    height: "200",
               });
               const book = await Book.create({
                    name,
                    author,
                    category,
                    cover: {
                         public_id: result.public_id,
                         url: result.secure_url
                    }
               });
               bookList.push(book);
          })
          res.status(200).json(bookList);
     } catch (err) { console.error(err) }
}

const deleteBook = async (req, res) => {
     try {
          const book = await Book.deleteOne({ _id: req.body.id }).exec();
          res.status(200).json(book);
     } catch (err) { console.error(err) }
}

module.exports = { getBook, createBook, deleteBook };