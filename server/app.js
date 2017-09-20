require('dotenv').config();
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const methodOverride = require('method-override');
const session = require('express-session');
const bodyParser = require('body-parser');
const errorHandler = require('errorhandler');
const app = express();
const mongoose = require('mongoose');
const apiRouter = require('./routes');

mongoose.Promise = global.Promise;

//Dev environment
if(app.get('env') === 'development') {
  app.use(errorHandler());

  // Connect to local DB
  mongoose.connect('mongodb://127.0.0.1:27017/LoginApp',
    { useMongoClient: true},
    () => { console.log('Connected to DB')}
  );
}

// Production environment
if(app.get('env') === 'production') {
  mongoose.connect(process.end.MONGODB_URI,
    { useMongoClient: true},
    () => { console.log('Connection to production DB.')}
  );
}

// All environments
app.set('port', process.env.PORT || 3000);
app.use(morgan('dev'));
app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', apiRouter);

module.exports = app;
