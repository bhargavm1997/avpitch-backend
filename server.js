var createError = require('http-errors');
var express = require('express');
/*const fileUpload = require('express-fileupload');*/
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/routes');



var app = express();
/*app.use(fileUpload());*/

app.use(cors({ credentials:true, origin:'http://localhost:3000' }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

/*app.post('/upload', (req, res) => {
  // Log the files to the console
  console.log(req.files);

  // All good
  res.sendStatus(200);
});*/

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

module.exports = app;