/*******************************
REQUIRES 
*******************************/
var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');

/*******************************
EXPRESS 
*******************************/
var app = express();
app.use(express.static(__dirname + '/public'));

/*******************************
DB 
*******************************/
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/wtt-paysimple');

/*******************************
PASSPORT
*******************************/
var passportConfig = require('./passport/passport');

/*******************************
AUTH CONTROLLER 
*******************************/
var authController = require('./controllers/authController');

/*******************************
BODY PARSER
*******************************/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/*******************************
SESSION 
*******************************/
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/*******************************
DEPENDENCIES 
*******************************/
app.use('/node_modules', express.static(__dirname + "/node_modules"));

/*******************************
AUTH ROUTES 
*******************************/
app.get('/auth/login', authController.login);
app.post('/auth/login', authController.processLogin);
app.post('/auth/signup', authController.processSignup);

/*******************************
GET USER ROUTE
*******************************/
app.get('/api/me', function(req, res){
	res.send(req.user);
});

/*******************************
AUTHENTICATION & REDIRECT 
*******************************/
app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'POST', 'GET', 'PATCH', 'DELETE');
	res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
})
app.use(passportConfig.ensureAuthenticated);
app.get('/', function(req, res){
  res.sendFile('/html/user.html', {root : './public'});
});

/*******************************
SERVER
*******************************/
var port = 3000
app.listen(port, function(){
  console.log('Server running on port ' + port);
});

















