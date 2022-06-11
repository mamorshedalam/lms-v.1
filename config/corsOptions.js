const whitelist = ['http://127.0.0.1:4000', 'http://localhost:4000', 'localhost:4000'];

const corsOptions = {
     origin: (origin, callback) => {
          if (whitelist.indexOf(origin) !== -1 || !origin) {
               callback(null, true)
          } else {
               callback(new Error("Not allowed by CORS"))
          }
     },
     optionsSuccessStatus: 200
}
module.exports = corsOptions;