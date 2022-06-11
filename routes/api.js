const express = require('express`');
const router = express.Router();
const path = require('path');
const data = {};
const database = require('');

router.route('/')
     .get((req, res) => {
          res.json(database);
     })
     .post((req, res) => {
          res.json({
               "firstname": req.body.firstname,
               "lastname": req.body.lastname
          })
     })