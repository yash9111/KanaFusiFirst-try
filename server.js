const express = require('express');
const bodyParser = require('body-parser');



const uploadRoute = require('./routes/upload')

const app = express();
const port = process.env.PORT || 3000;

// configure body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/upload',uploadRoute);

// define API endpoint for handling POST requests


app.listen(port, function() {
  console.log('Server started on port ' + port);
});
