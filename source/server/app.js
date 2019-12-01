// 필요 모듈 임포트
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const compression = require('compression');
const timeout = require('connect-timeout');
const session = require('express-session');
const multer = require('multer');
const moment = require('moment');
const history = require('connect-history-api-fallback');
const ejs = require('ejs');
const MySQLStore = require('express-mysql-session')(session);
const app = express();
const proxy = require('express-http-proxy');


const config = require('./config/config.json')[process.env.NODE_ENV || 'development'];

const viewPath = config.path;

// 뷰 엔진 셋업
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');

// express 환경 셋업
app.use(timeout('30s'));
app.use(logger((app.get('env') === 'development' ? 'dev' : 'default')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, viewPath.index)));
} else {
  app.use('/', express.static(path.join(__dirname, viewPath.index)));
}


const sessionStore = new MySQLStore({
  host: config.db.host,
  port: config.db.port,
  user: config.db.username,
  password: config.db.password,
  database: config.db.database
});

app.use(compression());
app.use(session({
  secret: 'SETeam3',
  proxy: true,
  store: sessionStore,
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 3 * 60 * 60 * 1000 } // 세션 유지 3시간
}));

app.use('/rest', require('./routes'));
app.use('/rest/user', require('./routes/rest/user'));
app.use('/rest/question', require('./routes/rest/question'));
app.use('/rest/field', require('./routes/rest/field'));

app.use(history());

if (process.env.proxy == 'false') {
  app.use('/', express.static(path.join(__dirname, viewPath.index)));
}

if (process.env.proxy == 'true') {
  app.use('/', proxy('localhost:8001'));
}

// / error handlers

// / catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err,
      title: 'error'
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    message: err.message,
    error: {},
    title: 'error'
  });
});

/*
const sequelize = require('sequelize');
const models = require('./models');
models.sequelize.sync({force: true});
*/
module.exports = app;
