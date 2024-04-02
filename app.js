const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const sequelize = require('./models').sequelize; //import sequelize instance
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// require route modules
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

//middleware setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//user session initialization
app.use(session({
    secret: 'andrew', //update with real key later
    store: new SequelizeStore({
        db: sequelize, //sequelize instance from user.js model
    }),
    resave: false, //false = unnecessary session updates
    saveUninitialized: false, // no session until something is stored
    checkExpirationInterval: 15 * 60 * 1000, //cleanup expired sessions in milliseconds
    expiration: 24 * 60 * 60 * 1000 // max age of sessions in milliseconds
}));

// route configs
app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
