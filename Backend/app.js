var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')

var userRouter = require('./routes/userRouter');
var articlesRouter = require('./routes/articlesRouter');
var reviewsRouter = require('./routes/reviewsRouter');
var coverLettersRouter = require('./routes/coverLettersRouter');
var authorsRouter = require('./routes/authorsRouter');

var existRepository = require('./repository/existRepository');

const authorizationInterceptor = require('./authorization/authorizationInterceptor')


var app = express();

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// jwt authorization intercepter
app.use(async function(req, res, next) {
  try {
    req = await authorizationInterceptor.autorize(req);
  } catch (e) {
    next(e);
    return;
  }
  next();
})

app.use('/articles', articlesRouter);
app.use('/reviews', reviewsRouter);
app.use('/coverLetters', coverLettersRouter);
app.use('/authors', authorsRouter);
app.use('/users', userRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500).send({message: err.message});
});

app.get('/test', (req, res) => res.send('Test works'))


existRepository.createCollections();

module.exports = app;

