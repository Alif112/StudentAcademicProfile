var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var session= require('express-session');
var expressValidator=require('express-validator');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var flash = require('connect-flash');
var passport =require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongo = require('mongodb');
var mongoose= require('mongoose');
var url=require('url');
var nodemailer = require('nodemailer');
var async = require('async');
var crypto=require('crypto');

//var sleep=require('sleep');

mongoose.connect('mongodb://localhost/NodeDemo');
var db = mongoose.connection;


var index = require('./routes/index');
var users = require('./routes/users');
var profile = require('./routes/profile');
var results = require('./routes/results');
var projects = require('./routes/projects');
var publications = require('./routes/publications');
var awards = require('./routes/awards');
var graduations = require('./routes/graduations');
var interests = require('./routes/interests');
var hobbies=require('./routes/hobbies');
var generatecvs=require('./routes/generatecvs');
var search=require('./routes/search');
var pdf=require('./routes/pdf');


var app = express();


app.set('views', [path.join(__dirname, 'views'),
                 path.join(__dirname, 'views/register'),
                 path.join(__dirname, 'views/startpage'),
                 path.join(__dirname, 'views/profiledata'),
                 path.join(__dirname, 'views/results'),
                 path.join(__dirname, 'views/projects'),
                 path.join(__dirname, 'views/publications'),
                 path.join(__dirname, 'views/awards'),
                 path.join(__dirname, 'views/graduations'),
                 path.join(__dirname, 'views/interests'),
                 path.join(__dirname, 'views/hobbies'),
                 path.join(__dirname, 'views/generatecvs'),
                 path.join(__dirname, 'views/charts'),
                 path.join(__dirname, 'views/searchtable'),
                 path.join(__dirname, 'views/pdf')
                   ]);


app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/profile', express.static(__dirname + '/public'));
app.use('/profile/dashboard', express.static(__dirname + '/public'));

app.use('/results', express.static(__dirname + '/public'));


app.use('/projects', express.static(__dirname + '/public'));
app.use('/projects/data/edit', express.static(__dirname + '/public'));
app.use('/projects/data/delete', express.static(__dirname + '/public'));

//publications static data
app.use('/publications', express.static(__dirname + '/public'));
app.use('/publications/data/edit', express.static(__dirname + '/public'));
app.use('/publications/data/delete', express.static(__dirname + '/public'));

app.use('/awards', express.static(__dirname + '/public'));
app.use('/awards/data/edit', express.static(__dirname + '/public'));
app.use('/awards/data/delete', express.static(__dirname + '/public'));

app.use('/graduations', express.static(__dirname + '/public'));
app.use('/graduations/data/edit', express.static(__dirname + '/public'));
app.use('/graduations/data/delete', express.static(__dirname + '/public'));

app.use('/interests', express.static(__dirname + '/public'));
app.use('/interests/data/edit', express.static(__dirname + '/public'));
app.use('/interests/data/delete', express.static(__dirname + '/public'));

app.use('/hobbies', express.static(__dirname + '/public'));
app.use('/hobbies/data/edit', express.static(__dirname + '/public'));
app.use('/hobbies/data/delete', express.static(__dirname + '/public'));

app.use('/search', express.static(__dirname + '/public'));
app.use('/search/searchresult', express.static(__dirname + '/public'));

app.use('/generatecvs', express.static(__dirname + '/public'));

app.use('/pdf', express.static(__dirname + '/public'));


app.use('/photos',require('./routes/photos'));
//express session

app.use(session({
  secret:'secret',
  saveUninitialized:true,
  resave:true
}));

// Passport initializer
app.use(passport.initialize());
app.use(passport.session());



// Express Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.'),
      root    = namespace.shift(),
      formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

//oh yah this is connect flash

app.use(flash());

// this is our global variables

app.use(function(req,res,next){
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.info=req.flash('info');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
next();

});




app.use('/', index);
app.use('/users', users);
app.use('/profile',profile);
app.use('/results',results);
app.use('/projects',projects);
app.use('/publications',publications);
app.use('/awards',awards);
app.use('/graduations',graduations);
app.use('/interests',interests);
app.use('/hobbies',hobbies);
app.use('/generatecvs',generatecvs);
app.use('/search',search);
app.use('/pdf',pdf);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

console.log('Connection Ok. with Port 3000');
//
// module.exports.sleep=function(time, callback) {
//     var stop = new Date().getTime();
//     while(new Date().getTime() < stop + time) {
//     }
//     callback();
// };

module.exports = app;
