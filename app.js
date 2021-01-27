var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var multer = require('multer')


var indexRouter = require('./routes/index_router');
var usersRouter = require('./routes/users_router');
var photoRouter = require('./routes/photo_router');

var app = express();

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '/upload/'));
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '_' + Date.now() + file.originalname.slice(file.originalname.lastIndexOf('.')))
  }
})

var upload = multer({storage: storage}).any();

//app.use(upload);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//app级路由将匹配到的路由截取，在传给相应router,next()是交给下一个app级路由
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/photo*', upload, photoRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
