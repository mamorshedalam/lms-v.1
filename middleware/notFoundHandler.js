const path = require('path');

const NotFoundHandler = (req, res) => {
     res.status(404);
     if (req.accepts('html')) {
          res.status(404).sendFile(path.join(__dirname, '../', '404.html'));
     } else if (req.accepts('json')) {
          res.json({ error: "404 Not Found" });
     } else {
          res.type('txt').send("404 Not Found");
     }
}

module.exports = NotFoundHandler;