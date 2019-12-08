// Initial Config
require('dotenv').config();

const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Database
require("./db");

// Routes
const router = require('./routes');

// Middleware
app.use(cors());
app.use(bodyParser.json());
router(app);

// Handle Errors 404
app.use((req, res, next) => {
  res.status(404).send('No route find');
});

// Handle Errors 500
app.use((err, req, res, next) => {
  if (err.name === "ValidationError") {
    res.status(422).json({ errors: err.errors });  
  } else {
    console.log(err);
    res.status(500).json({ error: err.message  });
  }
});

module.exports = app;
