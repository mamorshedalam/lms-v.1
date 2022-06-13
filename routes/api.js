const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

router.route('/')
     .post(bookController.createBook)
     .get(bookController.getBook)
     .delete(bookController.deleteBook);
module.exports = router;