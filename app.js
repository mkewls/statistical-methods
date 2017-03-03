// This is a simple web server handling requests to the transparent proxy
// at '/signals' and providing basic error handling, parsing, and logging

const bodyParser = require('body-parser');
const morgan = require('morgan');           // logging
const express = require('express');         // routing abstracter
const app = express();
const routes = require('./routes');

const PORT = 8080;  // dev only

app
  .use(bodyParser.urlencoded({ extended: false })) // false = only strings/arrays
  .use(morgan('dev'))
  .use('/signals', routes);

// catch-all error handling
app.use((err, req, res, next) => {
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});

app.listen(PORT, err => {
  if (err) throw err;
  console.log(`Server listening on port ${PORT}`);
});

module.exports = app;
