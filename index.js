const express = require('express');

const app = express();
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const errorHandler = require('./middleware/errorHandler');
const PORT = process.env.PORT || 4000;

// coss origin resource sharing
app.use(cors(corsOptions));
// built-in middleware to handle urlencoded data
app.use(express.urlencoded({ extended: false }));
// built-in middleware for json
app.use(express.json());

// serve static files
app.use('/', express.static(path.join(__dirname, '/public')));
app.use('/dashboard', express.static(path.join(__dirname, '/dashboard')));

// routes
// app.use('/', require('./routes/root'));
// app.use('/dashboard', require('./routes/dashboard'));
// app.use('/books', require('./routes/api'));


// 404 handler
app.all('*', (req, res) => {
     res.status(404);
     if (req.accepts('html')) {
          res.status(404).sendFile(path.join(__dirname, '404.html'));
     } else if (req.accepts('json')) {
          res.json({ error: "404 Not Found" });
     } else {
          res.type('txt').send("404 Not Found");
     }
})

// custom error handler
app.use(errorHandler);
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));