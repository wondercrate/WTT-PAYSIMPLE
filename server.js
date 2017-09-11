/*******************************
REQUIRES 
*******************************/
var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var config = require("./config");
//var paymentController = require("./controllers/paymentController");
var paymentController = require("./payments/paymentController");
var userController = require("./auth/resetUserController");
var programController = require('./programs/programController');
var ZCapp = require('zcapp');
/*******************************
EXPRESS 
*******************************/
var app = express();
app.use(express.static(__dirname + '/public'));

/*******************************
DB 
*******************************/
var mongoose = require('mongoose');
mongoose.connect(config.MONGODB_CONNECTION_STRING);

/*******************************
PASSPORT
*******************************/
//var passportConfig = require('./passport/passport');
var passportConfig = require('./auth/userPassport');
/*******************************
AUTH CONTROLLER 
*******************************/
var authController = require('./auth/userController');

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
app.use('/images', express.static(__dirname + "/images"));
/*******************************
AUTH ROUTES 
*******************************/
// GET PROGRAMS \\
app.get('/api/programs/getPrograms', programController.getPrograms);
app.use("/api/payment", paymentController.router);
app.get('/wtt/', authController.login);
app.post('/wtt/', authController.processLogin);
app.post('/wtt/signup', authController.processSignup);

app.post("/api/user/reset-password-request", userController.resetPasswordRequest);
app.post("/api/user/reset-password", userController.resetPassword);
app.post('/api/zoho', function(req, res){
	var app = new ZCapp({
		appName: config.ZOHO.appName,
		ownername: config.ZOHO.ownername,
		authtoken: config.ZOHO.authtoken
	});
	app.form('LeadsForm').add(req.body)
		.then((response) => {
			console.log(response);
			res.send(response);
		})
});
/*******************************
GET USER ROUTE
*******************************/
app.get('/api/me', function(req, res){
	res.send(req.user);
});

app.get('/reset-password',function(req,res){
	res.sendFile('/html/reset-password.html', {root : './public'});
});
/*******************************
AUTHENTICATION & REDIRECT 
*******************************/
app.use(passportConfig.ensureAuthenticated);
app.get('/my-account', function(req, res){
  res.sendFile('/html/user.html', {root : './public'});
});
// ADD/DELETE/EDIT PROGRAMS \\
app.post('/api/programs/addProgram', programController.addProgram);
app.delete('/api/programs/deleteProgram/:id', programController.deleteProgram);
app.post('/api/programs/updateProgram', programController.updateProgram);

app.use(function(err, req, res, next) {
  res.status(404).send(err.message);
})
/*******************************
SERVER
*******************************/

app.listen(config.PORT, function(){
  console.log('Server running on port ' + config.PORT);
});

















