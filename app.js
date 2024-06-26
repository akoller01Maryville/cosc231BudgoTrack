const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sequelize = require('./models').sequelize; //import sequelize instance

// require route modules
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const apiRouter = require('./routes/api');

const app = express();

//user session initialization
app.use(session({
    secret: 'andrew', //TODO:update with real key later
    store: new SequelizeStore({
        db: sequelize, //sequelize instance from user.js model
    }),
    resave: false, //false = unnecessary session updates
    saveUninitialized: false, // no session until something is stored
    cookie: { secure: 'auto', maxAge: 24 * 60 * 60 * 1000 }, // cookie for browser
    checkExpirationInterval: 15 * 60 * 1000, //cleanup expired sessions in milliseconds
    expiration: 24 * 60 * 60 * 1000 // max age of sessions in milliseconds
}));

//middleware setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// route configs
app.use('/', indexRouter);
app.use('/users', usersRouter); // mounts users routes at /users
app.use('/api', apiRouter);

module.exports = app;
