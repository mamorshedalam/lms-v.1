require('dotenv').config();
// INIT
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
// INPUT
const connectDB = require('./config/dbConn');
const corsOptions = require('./config/corsOptions');
const errorHandler = require('./middleware/errorHandler');
const notFoundHandler = require('./middleware/notFoundHandler');

// DATABASE
connectDB();

// EXPRESS INIT
const app = express();
// coss origin resource sharing
app.use(cors(corsOptions));
// built-in middleware to handle urlencoded data
app.use(express.urlencoded({ extended: false }));
// built-in middleware for json
app.use(express.json());

// serve static files
app.use('/', express.static(path.join(__dirname, '/public')));
app.use('/dashboard', express.static(path.join(__dirname, '/dashboard')));

// ROUTES
app.use('/', require('./routes/root'));
app.use('/dashboard', require('./routes/dashboard'));
app.use('/api', require('./routes/api'));

// 404 handler
app.all('*', notFoundHandler)
// custom error handler
app.use(errorHandler);
// RUN
const PORT = process.env.PORT || 4000;
mongoose.connection.once('open', () => {
     console.log("Connected to MongoDB");
     app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
})