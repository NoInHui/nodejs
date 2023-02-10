const createError = require('http-errors');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
let flash = require('connect-flash');

const app = express();

app.set('views', path.join(__dirname, 'view'));
app.set('view engine', 'ejs');

app.use(cors());
app.use(express.json({limit : "50mb"}));
app.use(express.urlencoded({limit : "50mb", extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(flash());

const mainRouter = require('./server/main/router');
const fileRouter = require('./server/file/router');

app.use('/', mainRouter);
app.use('/file', fileRouter);

module.exports = app;